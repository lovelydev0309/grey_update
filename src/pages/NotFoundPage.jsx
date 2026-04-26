import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="grid min-h-[50vh] place-content-center gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-8 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">404</p>
      <h1 className="text-4xl font-semibold tracking-tight text-white">
        This page got lost.
      </h1>
      <p className="max-w-xl text-slate-300">
        The URL you entered does not match any page in this site. Use the links
        below to continue exploring Grey.
      </p>
      <div className="mt-2 flex justify-center gap-3">
        <Link
          to="/"
          className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950"
        >
          Go to homepage
        </Link>
        <Link
          to="/ideas"
          className="rounded-full border border-white/20 px-4 py-2 text-sm text-slate-200"
        >
          Browse ideas
        </Link>
      </div>
    </section>
  )
}
