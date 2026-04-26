/**
 * One-off: pull __NEXT_DATA__ from Grey HTML and log image fields (news, etc.)
 */
const url = process.argv[2] || 'https://www.grey.com/news'
const res = await fetch(url)
const html = await res.text()
const m = html.match(/<script id="__NEXT_DATA__" type="application\/json">([^<]+)<\/script>/)
if (!m) {
  console.error('No __NEXT_DATA__')
  process.exit(1)
}
const data = JSON.parse(m[1])
const walk = (obj, path = '') => {
  if (obj === null || obj === undefined) return
  if (typeof obj === 'string') {
    if (obj.startsWith('https://images.ctfassets.net')) console.log(path.slice(0, 120), obj.slice(0, 100))
    return
  }
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => walk(v, `${path}[${i}]`))
    return
  }
  if (typeof obj === 'object') {
    for (const k of Object.keys(obj)) walk(obj[k], `${path}.${k}`)
  }
}
walk(data.props)
