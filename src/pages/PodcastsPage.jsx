import { podcastsPage } from '../data/podcastsContent'
import { manifest } from '../data/greyManifestData'

function EpisodeCard({ title, excerpt, href }) {
  const inner = (
    <>
      <h3 className="text-base font-semibold leading-snug text-white md:text-lg">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{excerpt}</p>
    </>
  )
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 transition hover:border-cyan-500/20">
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block">
          {inner}
          <span className="mt-3 inline-block text-xs font-medium uppercase tracking-wider text-cyan-400">
            Listen
          </span>
        </a>
      ) : (
        inner
      )}
    </article>
  )
}

export default function PodcastsPage() {
  const { greyMatter, fiveThings } = podcastsPage
  const origin = manifest.podcasts

  return (
    <section className="space-y-14">
      <nav
        className="flex flex-wrap gap-3 text-sm font-medium text-slate-400"
        aria-label="Podcast shows"
      >
        {podcastsPage.navLabels.map((label) => (
          <a
            key={label}
            href={`#${label === '#5Things' ? 'five-things' : 'grey-matter'}`}
            className="rounded-full border border-white/10 px-4 py-2 transition hover:border-cyan-500/30 hover:text-cyan-200"
          >
            {label}
          </a>
        ))}
      </nav>

      <div id="grey-matter" className="scroll-mt-24 space-y-8">
        <header className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            {origin.logo ? (
              <img
                src={origin.logo}
                alt="Grey Matter"
                className="mx-auto h-40 w-40 shrink-0 rounded-2xl border border-white/10 object-contain md:mx-0"
                width={160}
                height={160}
                loading="eager"
                decoding="async"
              />
            ) : null}
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-cyan-400/90">
                {greyMatter.subtitle}
              </p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                {greyMatter.title}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
                {greyMatter.description}
              </p>
              <p className="mt-4 text-sm text-slate-500">{greyMatter.listenNote}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {origin.spotifyLink ? (
                  <a
                    href={origin.spotifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2.5 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/20"
                  >
                    Spotify
                  </a>
                ) : null}
                {origin.appleLink ? (
                  <a
                    href={origin.appleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
                  >
                    Apple Podcasts
                  </a>
                ) : null}
                <a
                  href={podcastsPage.originUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-white/15 px-5 py-2.5 text-sm text-slate-300 transition hover:border-cyan-500/30 hover:text-white"
                >
                  grey.com/podcasts
                </a>
              </div>
            </div>
          </div>
        </header>

        <div>
          <h2 className="mb-4 text-xl font-semibold text-white">Episodes</h2>
          <p className="mb-4 text-sm text-slate-500">
            Titles and descriptions from the Grey site RSS feed ({origin.episodes?.length ?? 0}{' '}
            episodes).
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {(origin.episodes || []).map((ep) => (
              <EpisodeCard
                key={ep.number + ep.title}
                title={ep.title}
                excerpt={ep.descriptionPlain.slice(0, 280) + (ep.descriptionPlain.length > 280 ? '…' : '')}
                href={ep.link}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold text-white">Bonus: Pillars of Creativity</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {greyMatter.bonusSeries.map((ep) => (
              <EpisodeCard key={ep.title} title={ep.title} excerpt={ep.excerpt} />
            ))}
          </div>
        </div>
      </div>

      <div
        id="five-things"
        className="scroll-mt-24 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/80 to-slate-950/90 p-6 md:p-10"
      >
        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {fiveThings.title}
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-slate-300">{fiveThings.description}</p>
        <p className="mt-4 text-sm text-slate-400">{fiveThings.crossPromo}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {fiveThings.platforms.map((p) => (
            <li
              key={p}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300"
            >
              {p}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-center text-sm text-slate-500">{podcastsPage.archiveNote}</p>
    </section>
  )
}
