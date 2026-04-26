import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { navItems } from '../data/siteContent'

export default function SiteLayout() {
  const location = useLocation()

  return (
    <div className="mx-auto flex min-h-screen max-w-[1200px] flex-col bg-slate-950/80 px-5 md:px-8">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-slate-950/85 py-5 backdrop-blur">
        <NavLink
          className="text-2xl font-semibold tracking-tight text-white transition-colors hover:text-cyan-300"
          to="/"
        >
          Grey
        </NavLink>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-2 md:gap-5">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-full px-3 py-1.5 text-sm transition ${
                      isActive
                        ? 'bg-white/12 text-white'
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex flex-1 py-6">
        <div
          key={location.pathname}
          className="w-full rounded-2xl border border-white/10 bg-slate-900/40 p-4 md:p-7"
        >
          <Outlet />
        </div>
      </main>

      <footer className="flex items-center justify-between border-t border-white/10 py-5 text-xs tracking-wide text-slate-400">
        <p>FAMOUSLY EFFECTIVE</p>
        <ul className="flex items-center gap-5">
          <li>
            <Link to="/podcasts" className="hover:text-slate-200">
              Podcasts
            </Link>
          </li>
          <li>
            <Link to="/legal" className="hover:text-slate-200">
              Legal
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  )
}
