import json,re
from pathlib import Path
s=Path(r'd:\work\gray\ideas.html').read_text(encoding='utf-8',errors='ignore')
m=re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>',s,re.S)
d=json.loads(m.group(1))
idea_media={}

def walk(o):
    if isinstance(o,dict):
        u=o.get('url')
        assets=o.get('assetsCollection',{}).get('items',[]) if isinstance(o.get('assetsCollection'),dict) else []
        if isinstance(u,str) and assets:
            for a in assets:
                au=a.get('url') if isinstance(a,dict) else None
                if isinstance(au,str) and 'ctfassets.net' in au:
                    idea_media.setdefault(u,au); break
        for v in o.values(): walk(v)
    elif isinstance(o,list):
        for i in o: walk(i)
walk(d)
print('count',len(idea_media))
for i,(k,v) in enumerate(idea_media.items()):
    if i>25: break
    print(k,'=>',v)
