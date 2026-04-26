import { legalPage } from '../data/legalContent'

export default function LegalPage() {
  return (
    <article className="space-y-10 text-slate-300">
      <header className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 md:p-10">
        <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">{legalPage.title}</h1>
        <ul className="mt-6 flex flex-col gap-2 text-sm md:flex-row md:flex-wrap md:gap-x-6">
          {legalPage.documentLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 underline-offset-4 hover:underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </header>

      <section id="privacy" className="scroll-mt-24 rounded-2xl border border-white/10 bg-slate-900/50 p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-white">{legalPage.privacyTitle}</h2>
        <p className="mt-4 leading-relaxed">{legalPage.siteNote}</p>
        <p className="mt-4 leading-relaxed">{legalPage.purpose}</p>
        <p className="mt-4 leading-relaxed">{legalPage.changes}</p>
      </section>

      <section className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-amber-100">{legalPage.fraudWarning.title}</h2>
        {legalPage.fraudWarning.body.map((p) => (
          <p key={p} className="mt-3 leading-relaxed text-slate-300">
            {p}
          </p>
        ))}
      </section>

      <section className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-white">{legalPage.collection.title}</h2>
        <h3 className="mt-6 text-lg font-medium text-slate-200">{legalPage.collection.whatTitle}</h3>
        <ul className="mt-3 list-inside list-disc space-y-1 text-slate-400">
          {legalPage.collection.whatBullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <h3 className="mt-8 text-lg font-medium text-slate-200">{legalPage.collection.howTitle}</h3>
        <ol className="mt-4 space-y-4">
          {legalPage.collection.uses.map((u, i) => (
            <li key={u.text} className="leading-relaxed">
              <span className="font-medium text-slate-200">{i + 1}. </span>
              {u.text}{' '}
              <span className="text-sm text-slate-500">({u.basis})</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm leading-relaxed text-slate-500">{legalPage.cookiesNote}</p>
      </section>

      <section className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-white">{legalPage.sharing.title}</h2>
        <ul className="mt-4 list-inside list-disc space-y-2">
          {legalPage.sharing.bullets.map((b) => (
            <li key={b} className="leading-relaxed">
              {b}
            </li>
          ))}
        </ul>
        <p className="mt-6 leading-relaxed text-slate-400">{legalPage.sharing.retention}</p>
      </section>

      <section className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-white">{legalPage.security.title}</h2>
        <p className="mt-3 leading-relaxed">{legalPage.security.body}</p>
        <h2 className="mt-10 text-xl font-semibold text-white">{legalPage.children.title}</h2>
        <p className="mt-3 leading-relaxed">{legalPage.children.body}</p>
        <h2 className="mt-10 text-xl font-semibold text-white">{legalPage.transfers.title}</h2>
        <p className="mt-3 leading-relaxed">{legalPage.transfers.body}</p>
      </section>

      <section className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-white">{legalPage.rights.title}</h2>
        <p className="mt-3 leading-relaxed">{legalPage.rights.intro}</p>
        <ul className="mt-4 space-y-2">
          {legalPage.rights.authorities.map((a) => (
            <li key={a.region}>
              <span className="text-slate-200">{a.region}: </span>
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 underline-offset-2 hover:underline"
              >
                {a.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-white">{legalPage.contact.title}</h2>
        <p className="mt-3 leading-relaxed">{legalPage.contact.body}</p>
        <p className="mt-6 text-sm leading-relaxed text-slate-500">{legalPage.responsibleDisclosure}</p>
      </section>
    </article>
  )
}
