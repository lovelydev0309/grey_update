const res = await fetch('https://www.grey.com/locations')
const html = await res.text()
const m = html.match(/<script id="__NEXT_DATA__" type="application\/json">([^<]+)<\/script>/)
const data = JSON.parse(m[1])
const page = data.props.pageProps.data.page
console.log('hero', JSON.stringify(page.hero, null, 2).slice(0, 2000))
console.log('consys len', page.consysCollection?.items?.length)
if (page.consysCollection?.items?.[0]) {
  console.log('first item', JSON.stringify(page.consysCollection.items[0], null, 2).slice(0, 2500))
}
