import Link from "next/link";

const navItems = ["Monde", "Politique", "Culture", "Science"];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-stone-divider bg-parchment/95 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-editorial items-center justify-between px-6">
        <Link href="/" className="min-w-0" aria-label="Paris Match homepage">
          <div className="font-display text-xl font-black uppercase tracking-tight">
            <span className="text-ink">PARIS</span>
            <span className="text-rouge">MATCH</span>
          </div>
          <div className="eyebrow mt-0.5 text-[0.625rem]">
            Edition internationale
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          <Link href="/" className="nav-link-active">
            Accueil
          </Link>
          {navItems.map((item) => (
            <Link key={item} href={`/#${item.toLowerCase()}`} className="nav-link">
              {item}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center border border-stone-border font-sans text-label uppercase tracking-[0.1em] text-ink md:hidden"
          aria-label="Open navigation"
        >
          Menu
        </button>
      </div>
    </header>
  );
}
