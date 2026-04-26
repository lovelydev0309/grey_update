import { Link } from 'react-router-dom'
import { ideasDirectory } from '../data/siteContent'
import { ideaPreviewByUrl } from '../data/assetMaps'
import { originMediaForIdeaUrl } from '../data/greyManifestData'

function isVideoAsset(src) {
  return typeof src === 'string' && /\.(mp4|webm|mov)(\?|$)/i.test(src)
}

export default function IdeasPage() {
  return (
    <section className="space-y-6">
      <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Made by Grey</p>
      <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">Ideas</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {ideasDirectory.map((item, index) => {
          const origin = originMediaForIdeaUrl(item.url)
          const mediaSrc =
            origin?.image ||
            origin?.video ||
            item.image ||
            ideaPreviewByUrl[item.url]

          return (
            <Link
              key={item.slug}
              to={`/ideas/${item.slug}`}
              className="group rounded-2xl border border-white/10 bg-slate-900/55 p-4 opacity-0 shadow-lg shadow-slate-950/30 transition hover:-translate-y-1 hover:border-cyan-300/50"
              style={{
                animation: 'fadeUp 380ms ease-out forwards',
                animationDelay: `${Math.min(index * 45, 850)}ms`,
              }}
            >
              {mediaSrc ? (
                isVideoAsset(mediaSrc) ? (
                  <video
                    src={mediaSrc}
                    className="h-44 w-full rounded-lg object-cover transition duration-300 group-hover:brightness-110"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                  />
                ) : (
                  <img
                    src={mediaSrc}
                    className="h-44 w-full rounded-lg object-cover transition duration-300 group-hover:brightness-110"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                )
              ) : (
                <div className="flex h-44 items-end rounded-lg bg-gradient-to-br from-slate-800 to-slate-700 p-3 text-xs uppercase tracking-[0.15em] text-cyan-200/90">
                  {item.client}
                </div>
              )}

              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-cyan-300">{item.client}</p>
              <h3 className="mt-2 text-xl font-semibold text-white transition group-hover:text-cyan-300">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
