import { capabilitiesContent } from '../data/siteContent'
import { localAssetByRemote } from '../data/assetMaps'

function resolveAsset(src) {
  return localAssetByRemote[src] ?? src
}

export default function AboutPage() {
  return (
    <section className="space-y-12">
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 md:p-8">
        <h1 className="mb-5 text-4xl font-semibold tracking-tight text-white md:text-5xl">
          {capabilitiesContent.introTitle}
        </h1>
        {capabilitiesContent.introParagraphs.map((paragraph) => (
          <p key={paragraph} className="mb-4 max-w-4xl leading-relaxed text-slate-300">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-cyan-300 md:text-3xl">
          {capabilitiesContent.sectionTitle}
        </h2>
        <div className="space-y-8">
          {capabilitiesContent.capabilities.map((item) => (
            <article
              key={item.title}
              className={`grid gap-4 rounded-2xl border border-white/10 bg-slate-900/50 p-4 md:p-5 ${
                item.alignment === 'right' ? 'lg:grid-cols-[1.7fr_1fr]' : 'lg:grid-cols-[1fr_1.7fr]'
              }`}
            >
              <div className={`${item.alignment === 'right' ? 'lg:order-2' : 'lg:order-1'}`}>
                <h3 className="mb-3 text-2xl font-semibold tracking-tight text-white">
                  {item.title}
                </h3>
                {Array.isArray(item.body) ? (
                  item.body.map((paragraph) => (
                    <p key={paragraph} className="mb-3 leading-relaxed text-slate-300">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="leading-relaxed text-slate-300">{item.body}</p>
                )}
              </div>

              <div
                className={`grid ${
                  item.media.length === 1
                    ? 'grid-cols-1'
                    : item.media.length === 3
                      ? 'grid-cols-2 gap-x-2 gap-y-0'
                      : 'grid-cols-2 gap-2'
                } ${item.alignment === 'right' ? 'lg:order-1' : 'lg:order-2'}`}
              >
                {item.media.map((asset) =>
                  asset.type === 'video' ? (
                    <video
                      key={asset.src}
                      className={`w-full rounded-lg border border-white/10 bg-slate-950/70 object-cover ${
                        item.media.length === 3 && asset === item.media[2]
                          ? 'row-span-2 h-full min-h-[220px]'
                          : 'h-full'
                      }`}
                      src={resolveAsset(asset.src)}
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                    />
                  ) : (
                    <img
                      key={asset.src}
                      className={`w-full rounded-lg border border-white/10 bg-slate-950/70 object-cover ${
                        item.media.length === 3 && asset === item.media[2]
                          ? 'row-span-2 h-full min-h-[220px]'
                          : 'h-full'
                      }`}
                      src={resolveAsset(asset.src)}
                      alt={asset.alt}
                      loading="lazy"
                    />
                  ),
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 md:p-8">
        <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white">
          {capabilitiesContent.beyondBordersTitle}
        </h2>
        <p className="mb-4 max-w-5xl leading-relaxed text-slate-300">
          {capabilitiesContent.beyondBordersParagraph}
        </p>
        <p className="max-w-5xl leading-relaxed text-slate-300">
          {capabilitiesContent.achievements}
        </p>
      </div>
    </section>
  )
}
