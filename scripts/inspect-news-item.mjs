const res = await fetch('https://www.grey.com/news')
const html = await res.text()
const m = html.match(/<script id="__NEXT_DATA__" type="application\/json">([^<]+)<\/script>/)
const data = JSON.parse(m[1])
const items = data.props.pageProps.data.page.consysCollection.items
console.log('count', items.length)
console.log(JSON.stringify(items[0], null, 2).slice(0, 2500))
