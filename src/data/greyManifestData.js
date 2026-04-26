import manifest from './generated/greyManifest.json'

export { manifest }

/** Match ideas grid row to a directory card by canonical grey.com URL */
export function originMediaForIdeaUrl(url) {
  if (!url) return null
  const key = url.replace(/\/$/, '')
  return manifest.ideasGrid.find((g) => g.url && g.url.replace(/\/$/, '') === key) ?? null
}

/** Home carousel row aligned with featuredStories order (same seven as grey.com) */
export function originHomeSlideAt(index) {
  return manifest.homeCarousel[index] ?? null
}
