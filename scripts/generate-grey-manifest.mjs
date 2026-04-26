/**
 * Fetches Grey __NEXT_DATA__ and writes src/data/generated/*.json
 * with image/video URLs from the origin site (images.ctfassets.net, videos.ctfassets.net).
 * Run: node scripts/generate-grey-manifest.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const outDir = join(root, 'src', 'data', 'generated')
mkdirSync(outDir, { recursive: true })

async function fetchNextData(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} ${res.status}`)
  const html = await res.text()
  const m = html.match(/<script id="__NEXT_DATA__" type="application\/json">([^<]+)<\/script>/)
  if (!m) throw new Error(`No __NEXT_DATA__ ${url}`)
  return JSON.parse(m[1])
}

function richTextToPlain(doc) {
  if (!doc?.content) return ''
  const parts = []
  const walk = (nodes) => {
    for (const n of nodes || []) {
      if (n.value) parts.push(n.value)
      if (n.content) walk(n.content)
    }
  }
  walk(doc.content)
  return parts.join(' ').replace(/\s+/g, ' ').trim()
}

function extractNews(page) {
  const items = page.consysCollection?.items || []
  return items
    .filter((it) => it.__typename === 'ContentCard')
    .map((it) => {
      const img = it.assetsCollection?.items?.[0]?.url || null
      const path = it.link?.internalLink?.path || null
      return {
        title: (it.title || '').trim(),
        excerpt: richTextToPlain(it.description?.json) || '',
        image: img,
        path: path ? `https://www.grey.com/${path}` : 'https://www.grey.com/news',
      }
    })
}

function extractLocations(page) {
  const items = page.consysCollection?.items || []
  const regions = []
  for (const it of items) {
    if (it.__typename !== 'List' || !it.pagesCollection?.items) continue
    const offices = it.pagesCollection.items.map((p) => {
      const loc = p.tagLocation?.infoCollection?.items?.[0]
      const lines = []
      if (loc) {
        if (loc.streetAddressLine1) lines.push(loc.streetAddressLine1)
        if (loc.streetAddressLine2) lines.push(loc.streetAddressLine2)
        const cityLine = [loc.addressLocality, loc.postalCode, loc.addressCountry]
          .filter(Boolean)
          .join(', ')
        if (cityLine) lines.push(cityLine)
        if (loc.phone) lines.push(loc.phone)
      }
      return {
        name: p.title || p.headline,
        lines: lines.length ? lines : [p.tagLocation?.extraInfo || ''].filter(Boolean),
        image: p.image?.url || null,
        path: p.path ? `https://www.grey.com/${p.path}` : null,
      }
    })
    regions.push({ title: it.title, offices })
  }
  return {
    headline: page.headline || 'Here We Are',
    regions,
  }
}

function extractHomeCarousel(page) {
  const scroll = page.consysCollection?.items?.find((i) => i.__typename === 'FallbackScroll')
  const items = scroll?.itemsCollection?.items || []
  return items.map((it) => {
    const img = it.media?.image
    const vid = it.media?.videoUrl || (img?.contentType?.startsWith('video') ? img.url : null)
    const imageUrl = img && !img.contentType?.startsWith('video') ? img.url : null
    const slug = it.internalLink?.slug
    return {
      slug,
      client: it.client,
      title: it.title,
      description: it.subtitle,
      image: imageUrl,
      video: vid || null,
      path: it.internalLink?.path ? `https://www.grey.com/${it.internalLink.path}` : null,
    }
  })
}

function extractIdeasGrid(page) {
  const items = page.consysCollection?.items || []
  return items
    .filter((it) => it.__typename === 'ContentCard')
    .map((it) => {
      const asset = it.assetsCollection?.items?.[0]
      const isVideo = asset?.contentType?.startsWith('video/')
      const imageUrl = asset && !isVideo ? asset.url : null
      const videoUrl = isVideo ? asset?.url : null
      const link = it.link
      const path = link?.path
      const slug = link?.slug
      const client = link?.tagClient?.title || it.caption || ''
      const description =
        link?.description || it.headline || richTextToPlain(it.description?.json) || ''
      return {
        title: (it.title || '').trim(),
        client,
        description,
        image: imageUrl,
        video: videoUrl,
        url: path ? `https://www.grey.com/${path}` : null,
        slug: slug || null,
      }
    })
}

function extractPodcasts(page) {
  const pd = page.podcastData
  const episodes = (page.podcasts?.episodes || []).map((ep) => ({
    number: ep.number,
    title: `${ep.title} ${ep.titleLastTwoWords || ''}`.trim(),
    link: ep.link,
    descriptionPlain: ep.description?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() || '',
  }))
  return {
    logo: pd?.logo?.url || null,
    spotifyLink: pd?.spotifyLink || null,
    appleLink: pd?.appleLink || null,
    rssUrl: pd?.rssUrl || null,
    episodes,
  }
}

function collectAssetUrls(obj, into = new Set()) {
  if (obj === null || obj === undefined) return into
  if (typeof obj === 'string') {
    if (
      obj.startsWith('https://images.ctfassets.net/') ||
      obj.startsWith('https://videos.ctfassets.net/')
    ) {
      into.add(obj.split('?')[0])
    }
    return into
  }
  if (Array.isArray(obj)) {
    for (const x of obj) collectAssetUrls(x, into)
    return into
  }
  if (typeof obj === 'object') {
    for (const k of Object.keys(obj)) collectAssetUrls(obj[k], into)
  }
  return into
}

async function main() {
  const base = 'https://www.grey.com'
  const pages = {
    home: await fetchNextData(`${base}/`),
    ideas: await fetchNextData(`${base}/ideas`),
    news: await fetchNextData(`${base}/news`),
    locations: await fetchNextData(`${base}/locations`),
    podcasts: await fetchNextData(`${base}/podcasts`),
    legal: await fetchNextData(`${base}/legal`),
  }

  const homePage = pages.home.props.pageProps.data.page
  const ideasPage = pages.ideas.props.pageProps.data.page
  const newsPage = pages.news.props.pageProps.data.page
  const locationsPage = pages.locations.props.pageProps.data.page
  const podcastsPage = pages.podcasts.props.pageProps.data.page
  const legalPage = pages.legal.props.pageProps.data.page

  const manifest = {
    generatedAt: new Date().toISOString(),
    homeCarousel: extractHomeCarousel(homePage),
    ideasGrid: extractIdeasGrid(ideasPage),
    news: extractNews(newsPage),
    locations: extractLocations(locationsPage),
    podcasts: extractPodcasts(podcastsPage),
    legalOg: legalPage.metaData?.ogImage?.url || legalPage.metaData?.twitterImage?.url || null,
  }

  const assets = new Set()
  collectAssetUrls(manifest, assets)
  collectAssetUrls(homePage, assets)
  collectAssetUrls(ideasPage, assets)
  collectAssetUrls(newsPage, assets)
  collectAssetUrls(locationsPage, assets)
  collectAssetUrls(podcastsPage, assets)
  collectAssetUrls(legalPage, assets)

  writeFileSync(join(outDir, 'greyManifest.json'), JSON.stringify(manifest, null, 2), 'utf8')
  writeFileSync(
    join(outDir, 'greyAssetUrls.json'),
    JSON.stringify([...assets].sort(), null, 2),
    'utf8',
  )

  console.log('Wrote greyManifest.json — news', manifest.news.length, 'ideas', manifest.ideasGrid.length)
  console.log('Unique asset URLs (images+videos):', assets.size)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
