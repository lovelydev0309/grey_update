import json,re
from pathlib import Path
s=Path(r'd:\work\gray\ideas.html').read_text(encoding='utf-8',errors='ignore')
m=re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>',s,re.S)
if not m:
    raise SystemExit('No __NEXT_DATA__ found')
data=json.loads(m.group(1))
Path(r'd:\work\gray\ideas_next_data.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
print('ok')
