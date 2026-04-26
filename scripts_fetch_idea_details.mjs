import { writeFileSync } from 'node:fs'
import { ideasDirectory } from './src/data/siteContent.js'

function extractText(node, bag) {
  if (Array.isArray(node)) {
    for (const n of node) extractText(n, bag)
    return
  }
  if (!node || typeof node !== 'object') return
  if (node.nodeType === 'text' && typeof node.value === 'string') {
    const t = node.value.trim()
    if (t) bag.push(t)
  }
  for (const v of Object.values(node)) extractText(v, bag)
}

function walk(obj, paragraphs, media) {
  if (Array.isArray(obj)) {
    for (const x of obj) walk(x, paragraphs, media)
    return
  }
  if (!obj || typeof obj !== 'object') return

  if (obj.contentType && obj.url && typeof obj.url === 'string' && obj.url.includes('ctfassets.net')) {
    media.push({ url: obj.url, contentType: obj.contentType, title: obj.title ?? null })
  }

  if (obj.json && typeof obj.json === 'object') {
    const bag = []
    extractText(obj.json, bag)
    const t = bag.join(' ').trim()
    if (t) paragraphs.push(t)
  }

  for (const v of Object.values(obj)) walk(v, paragraphs, media)
}

const details = {}
for (const item of ideasDirectory) {
  const rec = {
    ...item,
    originTitle: null,
    originHeadline: null,
    originParagraphs: [],
    originMedia: [],
  }
  try {
    const res = await fetch(item.url, { redirect: 'follow' })
    const html = await res.text()
    const m = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/)
    if (m) {
      const data = JSON.parse(m[1])
      const page = data?.props?.pageProps?.data?.page ?? {}
      rec.originTitle = page?.title ?? null
      rec.originHeadline = page?.headline ?? null
      const paragraphs = []
      const media = []
      walk(page?.consysCollection?.items ?? [], paragraphs, media)
      rec.originParagraphs = [...new Set(paragraphs)].slice(0, 24)
      const seen = new Set()
      rec.originMedia = media.filter((x) => (seen.has(x.url) ? false : (seen.add(x.url), true))).slice(0, 16)
    }
  } catch {}
  details[item.slug] = rec
}

writeFileSync('./src/data/ideaDetails.js', `export const ideaDetailsBySlug = ${JSON.stringify(details, null, 2)}\n`, 'utf8')
console.log('generated', Object.keys(details).length)
