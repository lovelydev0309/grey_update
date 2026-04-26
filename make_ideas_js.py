import json
from pathlib import Path
arr=json.loads(Path(r'd:\work\gray\src\data\ideasDirectory.full.json').read_text(encoding='utf-8'))
Path(r'd:\work\gray\src\data\ideasDirectory.js').write_text('export const ideasDirectory = '+json.dumps(arr,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('ok',len(arr))
