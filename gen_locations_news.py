import json,re
from pathlib import Path

# Locations
loc_html=Path(r'd:\work\gray\locations.html').read_text(encoding='utf-8',errors='ignore')
m=re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>',loc_html,re.S)
loc_data=json.loads(m.group(1))
items=loc_data['props']['pageProps']['data']['page']['consysCollection']['items']
regions=[]
for sec in items:
    if sec.get('__typename')!='Section':
        continue
    for c in sec.get('consysCollection',{}).get('items',[]):
        if c.get('__typename')!='ContentCard':
            continue
        title=(c.get('title') or '').strip()
        if not title:
            continue
        cards=[]
        for cc in c.get('contentCardCollection',{}).get('items',[]):
            link=cc.get('link') or {}
            path=link.get('path')
            if not path:
                continue
            url=path if path.startswith('http') else 'https://www.grey.com/'+path.lstrip('/')
            cards.append({
                'name': (cc.get('title') or '').strip(),
                'detail': (cc.get('headline') or '').strip(),
                'url': url,
            })
        if cards:
            regions.append({'region': title, 'offices': cards})

Path(r'd:\work\gray\src\data\locationsData.js').write_text(
    'export const locationsData = '+json.dumps(regions,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

# News
news_html=Path(r'd:\work\gray\news.html').read_text(encoding='utf-8',errors='ignore')
m2=re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>',news_html,re.S)
news_data=json.loads(m2.group(1))
news_items=[]
for it in news_data['props']['pageProps']['data']['page']['consysCollection']['items']:
    if it.get('__typename')!='ContentCard':
        continue
    link=it.get('link') or {}
    path=link.get('path')
    if not path:
        continue
    url=path if path.startswith('http') else 'https://www.grey.com/'+path.lstrip('/')
    news_items.append({
        'title': (it.get('title') or '').strip(),
        'summary': (it.get('headline') or '').strip(),
        'url': url,
    })

Path(r'd:\work\gray\src\data\newsData.js').write_text(
    'export const newsData = '+json.dumps(news_items,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('locations',len(regions),'news',len(news_items))
