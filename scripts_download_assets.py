import json,re,hashlib,requests
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

def next_data(path):
    s=Path(path).read_text(encoding='utf-8',errors='ignore')
    m=re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>',s,re.S)
    return json.loads(m.group(1)) if m else {}

def walk(obj, media, idea_media):
    if isinstance(obj, dict):
        page_url=obj.get('url')
        assets=obj.get('assetsCollection',{}).get('items',[]) if isinstance(obj.get('assetsCollection'),dict) else []
        if isinstance(page_url,str) and page_url.startswith('https://www.grey.com') and assets:
            for a in assets:
                u=a.get('url') if isinstance(a,dict) else None
                if isinstance(u,str) and re.match(r'https://(?:images|videos)\.ctfassets\.net/',u):
                    idea_media.setdefault(page_url,u)
                    break
        for k,v in obj.items():
            if k=='url' and isinstance(v,str) and re.match(r'https://(?:images|videos)\.ctfassets\.net/',v):
                media.add(v)
            walk(v,media,idea_media)
    elif isinstance(obj,list):
        for i in obj:
            walk(i,media,idea_media)

ideas=next_data(r'd:\work\gray\ideas.html')
caps=next_data(r'd:\work\gray\capabilities.html')
media=set(); idea_media={}
walk(ideas,media,idea_media); walk(caps,media,idea_media)
site=Path(r'd:\work\gray\src\data\siteContent.js').read_text(encoding='utf-8')
for u in re.findall(r'https://(?:images|videos)\.ctfassets\.net[^\'\"\s]+', site): media.add(u)

out=Path(r'd:\work\gray\public\assets\grey-media'); out.mkdir(parents=True, exist_ok=True)

def dl(u):
    clean=u.split('?')[0]
    ext=Path(clean).suffix.lower() or '.bin'
    if ext not in {'.jpg','.jpeg','.png','.webp','.gif','.mp4','.webm','.mov','.svg'}: ext='.bin'
    name=hashlib.sha1(u.encode()).hexdigest()[:16]+ext
    p=out/name
    if not p.exists():
        r=requests.get(u,timeout=12)
        r.raise_for_status()
        p.write_bytes(r.content)
    return u,f'/assets/grey-media/{name}'

local={}
with ThreadPoolExecutor(max_workers=8) as ex:
    fut={ex.submit(dl,u):u for u in sorted(media)}
    for f in as_completed(fut):
        try:
            k,v=f.result(); local[k]=v
        except Exception:
            pass

idea_local={k:local[v] for k,v in idea_media.items() if v in local}
js='export const localAssetByRemote = '+json.dumps(local,ensure_ascii=False,indent=2)+'\n\n'
js+='export const ideaPreviewByUrl = '+json.dumps(idea_local,ensure_ascii=False,indent=2)+'\n'
Path(r'd:\work\gray\src\data\assetMaps.js').write_text(js,encoding='utf-8')
print('media_total',len(media),'downloaded',len(local),'ideas_mapped',len(idea_local))
