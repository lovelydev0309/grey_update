import { useParams } from 'react-router-dom'
import { ideasDirectory } from '../data/siteContent'
import { ideaPreviewByUrl, localAssetByRemote } from '../data/assetMaps'
import { ideaDetailsBySlug } from '../data/ideaDetails'
import NotFoundPage from './NotFoundPage'

function isVideoAsset(src) {
  return /\.(mp4|webm|mov)$/i.test(src || '')
}

export default function IdeaDetailPage() {
  const { slug } = useParams()
  const story = ideaDetailsBySlug[slug] || ideasDirectory.find((item) => item.slug === slug)

  if (!story) return <NotFoundPage />

  const mediaSrc = story.image || ideaPreviewByUrl[story.url]
  const gallery = (story.originMedia || []).map((m) => ({
    ...m,
    src: localAssetByRemote[m.url] || m.url,
  }))

  return (
    <section className="space-y-4">
      <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">{story.client}</p>
      <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
        {story.originHeadline || story.title}
      </h1>
      {mediaSrc ? (
        isVideoAsset(mediaSrc) ? (
          <video
            src={mediaSrc}
            className="w-full rounded-xl border border-white/10 object-cover"
            autoPlay
            loop
            muted
            playsInline
            controls
          />
        ) : (
          <img
            src={mediaSrc}
            className="w-full rounded-xl border border-white/10 object-cover"
            alt={story.title}
          />
        )
      ) : null}
      <div className="space-y-3">
        {(story.originParagraphs && story.originParagraphs.length > 0
          ? story.originParagraphs
          : [story.description]
        ).map((paragraph) => (
          <p key={paragraph} className="max-w-4xl leading-relaxed text-slate-300">
            {paragraph}
          </p>
        ))}
      </div>
      {gallery.length > 0 ? (
        <div className="grid gap-3 pt-2 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((asset) =>
            isVideoAsset(asset.src) ? (
              <video
                key={asset.src}
                src={asset.src}
                className="h-52 w-full rounded-xl border border-white/10 object-cover"
                autoPlay
                loop
                muted
                playsInline
                controls
              />
            ) : (
              <img
                key={asset.src}
                src={asset.src}
                className="h-52 w-full rounded-xl border border-white/10 object-cover"
                alt={asset.title || story.title}
              />
            ),
          )}
        </div>
      ) : null}
      <a
        href={story.url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm text-slate-200 hover:border-cyan-300/40 hover:text-cyan-300"
      >
        View original case link
      </a>
    </section>
  )
}
