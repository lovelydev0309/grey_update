import { manifest } from '../data/greyManifestData'

export default function NewsPage() {
  const news = manifest.news
  const headline = 'Here and Now'

  return (
    <section className="space-y-10">
      <header className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 md:p-10">
        <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
          {headline}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
          Press, leadership moves, client wins, and creative recognition from across the Grey network
          (imagery from{' '}
          <a
            href="https://www.grey.com/news"
            className="text-cyan-400 underline-offset-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            grey.com
          </a>
          ).
        </p>
      </header>

      <ul className="space-y-4">
        {news.map((item, index) => (
          <li
            key={`${item.title}-${index}`}
            className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 md:grid md:grid-cols-[minmax(0,220px)_1fr] md:gap-0"
          >
            {item.image ? (
              <a
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block aspect-[16/10] bg-slate-950 md:aspect-auto md:min-h-[200px]"
              >
                <img
                  src={item.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition hover:opacity-95"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            ) : (
              <div className="hidden bg-slate-950 md:block" aria-hidden="true" />
            )}
            <div className="flex flex-col justify-between p-5 md:flex-row md:items-start md:gap-8 md:p-6">
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-semibold leading-snug text-white md:text-xl">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400 md:text-base">
                  {item.excerpt}
                </p>
              </div>
              <div className="mt-4 shrink-0 md:mt-0">
                <a
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-wider text-cyan-200 transition hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-100"
                >
                  View more
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <p className="text-center text-sm text-slate-500">
        For the latest posts, visit{' '}
        <a
          href="https://www.grey.com/news"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 underline-offset-2 hover:underline"
        >
          grey.com/news
        </a>
        . Run <code className="text-slate-400">npm run sync:grey</code> to refresh this list from the
        live site.
      </p>
    </section>
  )
}
