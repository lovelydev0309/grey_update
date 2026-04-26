import { manifest } from '../data/greyManifestData'

export default function LocationsPage() {
  const { headline, regions } = manifest.locations

  return (
    <section className="space-y-12">
      <header className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 md:p-10">
        <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
          {headline}
        </h1>
        <p className="mt-6 text-lg text-slate-300">
          <span className="text-cyan-300/90">Say </span>
          <a
            href="mailto:hello@grey.com"
            className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-4 transition hover:text-cyan-200"
          >
            hello@grey.com
          </a>
        </p>
      </header>

      {regions.map((region) => (
        <div key={region.title}>
          <h2 className="mb-6 border-b border-white/10 pb-3 text-2xl font-semibold tracking-tight text-cyan-300 md:text-3xl">
            {region.title}
          </h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {region.offices.map((office) => (
              <li
                key={`${region.title}-${office.name}`}
                className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 transition hover:border-cyan-500/25 hover:bg-slate-900/70"
              >
                {office.image ? (
                  <a
                    href={office.path || 'https://www.grey.com/locations'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block aspect-[16/10] bg-slate-950"
                  >
                    <img
                      src={office.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                ) : null}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white">{office.name}</h3>
                  <address className="mt-3 space-y-1 not-italic text-sm leading-relaxed text-slate-400">
                    {office.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </address>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
