import json,re,time
from pathlib import Path
import requests

base='https://www.grey.com/'
root=Path(r'd:\work\gray\src\data')
next_data=json.loads(Path(r'd:\work\gray\ideas_next_data.json').read_text(encoding='utf-8'))
items=((next_data.get('props') or {}).get('pageProps') or {}).get('data',{}).get('page',{}).get('consysCollection',{}).get('items',[])

cards=[c for c in items if c.get('__typename')=='ContentCard']

session=requests.Session()
session.headers.update({'User-Agent':'Mozilla/5.0'})

def slugify(s):
    s=(s or '').lower()
    s=re.sub(r'[^a-z0-9]+','-',s).strip('-')
    return s or 'idea'

def rich_values(obj):
    txt=json.dumps(obj,ensure_ascii=False)
    vals=re.findall(r'"value":\s*"([^"]{40,})"',txt)
    out=[]; seen=set()
    for v in vals:
        v=v.replace('\\u00a0',' ').strip()
        if not v or v in seen: continue
        seen.add(v); out.append(v)
        if len(out)>=30: break
    return out

ideas=[]
details={}
used=set()

for idx,card in enumerate(cards):
    title=(card.get('title') or f'Idea {idx+1}').strip()
    desc=(card.get('headline') or '').strip()
    link=card.get('link') or {}
    path=(link.get('path') or '').strip()
    external=(base+path.lstrip('/')) if path else None

    base_slug=slugify(path or title)
    slug=base_slug
    n=2
    while slug in used:
        slug=f'{base_slug}-{n}'; n+=1
    used.add(slug)

    assets=[]
    for a in (card.get('assetsCollection') or {}).get('items',[]):
        c=(a.get('contentType') or '').lower()
        src=(a.get('url') or '').replace('\\/','/')
        if not src: continue
        mtype='video' if 'video' in c else 'image'
        assets.append({'type':mtype,'src':src,'contentType':a.get('contentType')})

    client=((link.get('tagClient') or {}).get('title') or '').strip()
    if not client:
        client='Grey'

    idea={
      'slug':slug,
      'title':title,
      'client':client,
      'description':desc,
      'url': external or f'/ideas/{slug}',
      'externalUrl': external,
      'assets': assets,
    }

    detail={
      'title': link.get('title') or title,
      'client': client,
      'headline': link.get('headline') or desc,
      'summary': link.get('description') or '',
      'textBlocks': rich_values(card),
      'assets': assets[:],
    }

    # enrich from destination page if available
    if external:
        try:
            html=session.get(external,timeout=25).text
            m=re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>',html,re.S)
            if m:
                d=json.loads(m.group(1))
                page=((d.get('props') or {}).get('pageProps') or {}).get('data',{}).get('page',{})
                if page:
                    detail['title']=page.get('title') or detail['title']
                    detail['headline']=page.get('headline') or detail['headline']
                    detail['summary']=page.get('description') or detail['summary']
                    vals=rich_values(page)
                    if vals: detail['textBlocks']=vals
                    txt=json.dumps(page,ensure_ascii=False)
                    media=[]; seen=set()
                    for mm in re.finditer(r'"contentType":\s*"([^"]+)"\s*,\s*"(?:width":\s*[^,]+,\s*"height":\s*[^,]+,\s*)?"url":\s*"(https:[^"]+)"',txt):
                        ctype=mm.group(1).lower(); src=mm.group(2).replace('\\/','/')
                        if 'ctfassets.net' not in src and 'downloads.ctfassets.net' not in src: continue
                        mtype='video' if 'video' in ctype else 'image'
                        key=(mtype,src)
                        if key in seen: continue
                        seen.add(key)
                        media.append({'type':mtype,'src':src,'contentType':mm.group(1)})
                    if media:
                        detail['assets']=media
                        idea['assets']=media[:1]
        except Exception:
            pass

    ideas.append(idea)
    details[slug]=detail
    time.sleep(0.1)

(root/'ideasDirectory.js').write_text('export const ideasDirectory = '+json.dumps(ideas,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
(root/'ideaDetails.js').write_text('export const ideaDetails = '+json.dumps(details,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('cards',len(cards),'ideas',len(ideas),'details',len(details))
