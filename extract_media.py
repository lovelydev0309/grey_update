import json,re
from pathlib import Path
s=Path(r'd:\work\gray\capabilities.html').read_text(encoding='utf-8',errors='ignore')
m=re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>',s,re.S)
data=json.loads(m.group(1)) if m else {}
txt=json.dumps(data)
urls=sorted(set(re.findall(r'https://[^"\\\s]+',txt)))
media=[u for u in urls if ('ctfassets.net' in u or u.endswith(('.mp4','.webm','.mov')) or '.m3u8' in u)]
Path(r'd:\work\gray\capabilities_media_urls.txt').write_text('\n'.join(media),encoding='utf-8')
print('COUNT',len(media))
