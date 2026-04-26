import json,re
from pathlib import Path
s=Path(r'd:\work\gray\ideas.html').read_text(encoding='utf-8',errors='ignore')
m=re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>',s,re.S)
print('has_next',bool(m))
if m:
 d=json.loads(m.group(1))
 t=json.dumps(d)
 urls=sorted(set(re.findall(r'https://(?:images|videos)\.ctfassets\.net[^"\\\s]+',t)))
 print('media',len(urls))
 print('\n'.join(urls[:20]))
