import json,re
from pathlib import Path
base='https://www.grey.com/'
data=json.loads(Path(r'd:\work\gray\ideas_next_data.json').read_text(encoding='utf-8'))
items=data['props']['pageProps']['data']['page']['consysCollection']['items']
rows=[]
for it in items:
    if it.get('__typename')!='ContentCard':
        continue
    link=it.get('link') or {}
    path=link.get('path')
    if not path:
        continue
    url=path if path.startswith('http') else base+path.lstrip('/')
    client=((link.get('tagClient') or {}).get('title') or '').strip()
    title=(it.get('title') or '').strip()
    desc=(it.get('headline') or '').strip()
    assets=[]
    for a in (it.get('assetsCollection') or {}).get('items',[]):
        c=(a.get('contentType') or '').lower()
        t='video' if 'video' in c else 'image'
        assets.append({'type':t,'src':a.get('url'),'contentType':a.get('contentType')})
    rows.append({'title':title,'client':client,'description':desc,'url':url,'assets':assets})

# dedupe by url while preserving order
seen=set(); out=[]
for r in rows:
    if r['url'] in seen: continue
    seen.add(r['url']); out.append(r)

js='export const ideasDirectory = '+json.dumps(out,ensure_ascii=False,indent=2)+'\n'
Path(r'd:\work\gray\src\data\ideasDirectory.js').write_text(js,encoding='utf-8')
print('written',len(out))
