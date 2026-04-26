import re,json,hashlib,requests
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

site=Path(r'd:\work\gray\src\data\siteContent.js').read_text(encoding='utf-8')
idea_urls=sorted(set(re.findall(r"url: '(https://www\.grey\.com[^']+)'", site)))

session=requests.Session()

def first_media(page_url):
    try:
        html=session.get(page_url,timeout=12).text
        m=re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>',html,re.S)
        if not m:
            return page_url,None
        data=json.loads(m.group(1))
        txt=json.dumps(data)
        mm=re.search(r'https://(?:images|videos)\.ctfassets\.net[^"\\\s]+',txt)
        return page_url,(mm.group(0) if mm else None)
    except Exception:
        return page_url,None

pairs={}
with ThreadPoolExecutor(max_workers=8) as ex:
    fut=[ex.submit(first_media,u) for u in idea_urls]
    for f in as_completed(fut):
        u,m=f.result()
        if m: pairs[u]=m

out=Path(r'd:\work\gray\public\assets\grey-media'); out.mkdir(parents=True,exist_ok=True)

def dl(url):
    clean=url.split('?')[0]
    ext=Path(clean).suffix.lower() or '.bin'
    if ext not in {'.jpg','.jpeg','.png','.webp','.gif','.mp4','.webm','.mov','.svg'}: ext='.bin'
    name=hashlib.sha1(url.encode()).hexdigest()[:16]+ext
    p=out/name
    if not p.exists():
        r=session.get(url,timeout=12)
        r.raise_for_status()
        p.write_bytes(r.content)
    return url,f'/assets/grey-media/{name}'

remote_to_local={}
with ThreadPoolExecutor(max_workers=8) as ex:
    fut=[ex.submit(dl,u) for u in sorted(set(pairs.values()))]
    for f in as_completed(fut):
        try:
            r,l=f.result(); remote_to_local[r]=l
        except Exception:
            pass

idea_local={k:remote_to_local[v] for k,v in pairs.items() if v in remote_to_local}

# merge with existing map file if exists
maps_path=Path(r'd:\work\gray\src\data\assetMaps.js')
existing_remote={}; existing_idea={}
if maps_path.exists():
    txt=maps_path.read_text(encoding='utf-8')
    m1=re.search(r'localAssetByRemote = (\{.*?\})\n\nexport',txt,re.S)
    m2=re.search(r'ideaPreviewByUrl = (\{.*\})\s*$',txt,re.S)
    if m1:
        existing_remote=json.loads(m1.group(1))
    if m2:
        existing_idea=json.loads(m2.group(1))

existing_remote.update(remote_to_local)
existing_idea.update(idea_local)
js='export const localAssetByRemote = '+json.dumps(existing_remote,ensure_ascii=False,indent=2)+'\n\n'
js+='export const ideaPreviewByUrl = '+json.dumps(existing_idea,ensure_ascii=False,indent=2)+'\n'
maps_path.write_text(js,encoding='utf-8')
print('idea_urls',len(idea_urls),'mapped',len(existing_idea),'remote_map',len(existing_remote))
