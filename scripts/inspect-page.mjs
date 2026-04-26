const url = process.argv[2]
const res = await fetch(url)
const html = await res.text()
const m = html.match(/<script id="__NEXT_DATA__" type="application\/json">([^<]+)<\/script>/)
if (!m) {
  console.log('no data', url)
  process.exit(1)
}
const data = JSON.parse(m[1])
const keys = Object.keys(data.props?.pageProps?.data || {})
console.log(url, 'pageProps.data keys:', keys)
const d = data.props.pageProps.data
if (d.page) console.log('page keys', Object.keys(d.page))
// try find images
const s = JSON.stringify(d).slice(0, 5000)
console.log(s.includes('ctfassets'), 'has ctfassets')
