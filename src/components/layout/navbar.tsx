import Link from "next/link";

const navItems = [
  "All",
  "Politics",
  "International",
  "Culture",
  "Society",
  "Technology",
  "Environment",
];

export function Navbar() {
  return (
    <header className="w-full border-b border-stone-border bg-white">
      <div className="flex h-6 items-center justify-between bg-ink px-6 font-sans text-[0.65rem] text-parchment/55">
        <p>Monday, 1 June 2026</p>
        <div className="hidden items-center gap-4 sm:flex">
          <Link href="/" className="transition-colors hover:text-parchment">
            Subscribe
          </Link>
          <span className="h-3 w-px bg-parchment/20" aria-hidden="true" />
          <Link href="/" className="transition-colors hover:text-parchment">
            Newsletter
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-5 lg:px-10 xl:px-14">
        <Link href="/" className="min-w-0" aria-label="Paris Match homepage">
          <div className="font-display text-3xl font-black uppercase leading-none tracking-[-0.04em] text-ink sm:text-4xl">
            Paris<span className="text-rouge">Match</span>
          </div>
          <div className="mt-1 flex items-center gap-2 font-sans text-[0.62rem] font-medium uppercase tracking-[0.38em] text-ink-muted">
            <span>Monde</span>
            <span className="h-1.5 w-8 bg-rouge" aria-hidden="true" />
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center text-xl text-ink transition-colors hover:text-rouge"
            aria-label="Search"
          >
            <span aria-hidden="true">⌕</span>
          </button>
          <Link href="/" className="btn-rouge hidden px-5 py-2.5 sm:inline-flex">
            S&apos;abonner
          </Link>
          <button
            type="button"
            className="font-sans text-label font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:text-rouge md:hidden"
            aria-label="Open navigation"
          >
            Menu
          </button>
        </div>
      </div>

      <nav
        className="flex gap-7 overflow-x-auto border-t border-stone-divider px-6 lg:px-10 xl:px-14"
        aria-label="Primary"
      >
        {navItems.map((item, index) => (
          <Link
            key={item}
            href={index === 0 ? "/" : `/#${item.toLowerCase()}`}
            className={index === 0 ? "nav-link-active py-3" : "nav-link py-3"}
          >
            {item}
          </Link>
        ))}
      </nav>
    </header>
  );
}
