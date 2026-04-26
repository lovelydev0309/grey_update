import json,re,time
from pathlib import Path
from urllib.parse import urlparse
import requests

root = Path(r'd:\work\gray\src\data')
ideas_src = root / 'ideasDirectory.js'
text = ideas_src.read_text(encoding='utf-8')
start = text.find('[')
end = text.rfind(']')
arr = json.loads(text[start:end+1])

def slugify(s):
    s = s.lower()
    s = re.sub(r'[^a-z0-9]+','-',s).strip('-')
    return s or 'idea'

session = requests.Session()
session.headers.update({'User-Agent':'Mozilla/5.0'})

ideas = []
details = {}
used = set()

for i,item in enumerate(arr, start=1):
    title = item.get('title','')
    base_slug = slugify(title)
    slug = base_slug
    n = 2
    while slug in used:
        slug = f'{base_slug}-{n}'
        n += 1
    used.add(slug)

    url = item['url']
    ideas.append({**item, 'slug': slug, 'externalUrl': url})

    detail = {
        'title': title,
        'client': item.get('client',''),
        'headline': item.get('description',''),
        'summary': '',
        'textBlocks': [],
        'assets': item.get('assets', [])[:]
    }

    try:
        resp = session.get(url, timeout=25)
        html = resp.text
        m = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', html, re.S)
        if m:
            data = json.loads(m.group(1))
            page = (((data.get('props') or {}).get('pageProps') or {}).get('data') or {}).get('page') or {}
            detail['title'] = page.get('title') or detail['title']
            detail['headline'] = page.get('headline') or detail['headline']
            detail['summary'] = page.get('description') or ''

            txt = json.dumps(page, ensure_ascii=False)
            # collect likely narrative sentences from rich text
            candidates = re.findall(r'"value":\s*"([^"]{40,})"', txt)
            blocks = []
            seen = set()
            for c in candidates:
                c = c.replace('\\u00a0', ' ').strip()
                if c and c not in seen and not c.startswith('http'):
                    seen.add(c)
                    blocks.append(c)
                if len(blocks) >= 24:
                    break
            detail['textBlocks'] = blocks

            media = []
            seen_media = set()
            for mm in re.finditer(r'"contentType":\s*"([^"]+)"\s*,\s*"(?:width":\s*[^,]+,\s*"height":\s*[^,]+,\s*)?"url":\s*"(https:[^"]+)"', txt):
                ctype = mm.group(1).lower()
                src = mm.group(2).replace('\\/','/')
                if 'ctfassets.net' not in src and 'downloads.ctfassets.net' not in src:
                    continue
                mtype = 'video' if 'video' in ctype else 'image'
                key = (mtype, src)
                if key in seen_media:
                    continue
                seen_media.add(key)
                media.append({'type': mtype, 'src': src, 'contentType': ctype})
            if media:
                detail['assets'] = media
    except Exception:
        pass

    details[slug] = detail
    time.sleep(0.15)

(root / 'ideasDirectory.js').write_text('export const ideasDirectory = ' + json.dumps(ideas, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
(root / 'ideaDetails.js').write_text('export const ideaDetails = ' + json.dumps(details, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print('generated', len(ideas), 'ideas')
