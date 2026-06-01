import Link from "next/link";

const navItems = ["Monde", "Politique", "Culture", "Science"];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-stone-divider bg-parchment/95 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-editorial items-center justify-between px-6">
        <Link href="/" className="min-w-0" aria-label="Paris Match homepage">
          <div className="font-display text-2xl font-black uppercase leading-none tracking-[-0.02em]">
            <span className="text-ink">PARIS</span>
            <span className="text-rouge">MATCH</span>
          </div>
          <div className="mt-1 font-sans text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ink-muted">
            Edition internationale
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-7" aria-label="Primary">
            <Link href="/" className="nav-link-active">
              Accueil
            </Link>
            {navItems.map((item) => (
              <Link
                key={item}
                href={`/#${item.toLowerCase()}`}
                className="nav-link"
              >
                {item}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="group flex h-9 w-9 items-center justify-center border-l border-stone-divider pl-6 font-sans text-lg text-ink-muted transition-colors hover:text-rouge"
            aria-label="Search"
          >
            <span aria-hidden="true">⌕</span>
          </button>
        </div>

        <button
          type="button"
          className="font-sans text-label font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:text-rouge md:hidden"
          aria-label="Open navigation"
        >
          Menu
        </button>
      </div>
    </header>
  );
}
