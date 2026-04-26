import re,json,requests
from pathlib import Path

text=Path(r'd:\work\gray\src\data\siteContent.js').read_text(encoding='utf-8')
# isolate ideasDirectory literal
m=re.search(r'export const ideasDirectory = \[(.*?)\]\.map\(', text, re.S)
chunk=m.group(1) if m else ''
obj_matches=re.findall(r'\{(.*?)\},', chunk, re.S)
items=[]
for body in obj_matches:
    def get_field(name):
        m=re.search(rf"{name}:\s*'([^']*)'", body)
        if m: return m.group(1)
        m=re.search(rf'{name}:\s*"([^"]*)"', body)
        if m: return m.group(1)
        return None
    title=get_field('title'); client=get_field('client'); desc=get_field('description'); url=get_field('url')
    if title and url:
        slug=re.sub(r'[^a-z0-9]+','-',title.lower()).strip('-')
        items.append({'slug':slug,'title':title,'client':client,'description':desc,'url':url})

session=requests.Session()

def flatten_text(node,out):
    if isinstance(node,dict):
        if node.get('nodeType')=='text' and isinstance(node.get('value'),str):
            v=node['value'].strip()
            if v: out.append(v)
        for v in node.values(): flatten_text(v,out)
    elif isinstance(node,list):
        for i in node: flatten_text(i,out)

res={}
for item in items:
    rec={**item,'originTitle':None,'originHeadline':None,'originParagraphs':[],'originMedia':[]}
    try:
        html=session.get(item['url'],timeout=20).text
        m=re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>',html,re.S)
        if m:
            data=json.loads(m.group(1))
            page=((data.get('props') or {}).get('pageProps') or {}).get('data',{}).get('page',{})
            rec['originTitle']=page.get('title')
            rec['originHeadline']=page.get('headline')
            consys=(page.get('consysCollection') or {}).get('items') or []
            paras=[]
            medias=[]
            def walk(o):
                if isinstance(o,dict):
                    if o.get('contentType') and isinstance(o.get('url'),str) and 'ctfassets.net' in o['url']:
                        medias.append({'url':o['url'],'contentType':o.get('contentType'),'title':o.get('title')})
                    if 'json' in o and isinstance(o['json'],dict):
                        bag=[]; flatten_text(o['json'],bag)
                        t=' '.join(bag).strip()
                        if t: paras.append(t)
                    for v in o.values(): walk(v)
                elif isinstance(o,list):
                    for i in o: walk(i)
            walk(consys)
            # unique keep order
            p2=[]; seen=set()
            for p in paras:
                if p not in seen: seen.add(p); p2.append(p)
            m2=[]; seen=set()
            for med in medias:
                if med['url'] not in seen: seen.add(med['url']); m2.append(med)
            rec['originParagraphs']=p2[:24]
            rec['originMedia']=m2[:16]
    except Exception:
        pass
    res[item['slug']]=rec

Path(r'd:\work\gray\src\data\ideaDetails.js').write_text('export const ideaDetailsBySlug = '+json.dumps(res,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('items',len(items),'details',len(res))
