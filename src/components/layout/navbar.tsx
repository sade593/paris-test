"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const navItems: {
  label: string;
  href: string;
  query?: string;
}[] = [
  { label: "All", href: "/" },
  { label: "Politics", href: "/?topic=politics#latest-stories", query: "polit" },
  {
    label: "International",
    href: "/?topic=international#latest-stories",
    query: "international",
  },
  { label: "Culture", href: "/?topic=culture#latest-stories", query: "culture" },
  { label: "Society", href: "/?topic=society#latest-stories", query: "soci" },
  { label: "Technology", href: "/?topic=technology#latest-stories", query: "tech" },
  {
    label: "Environment",
    href: "/?topic=environment#latest-stories",
    query: "climat",
  },
];

export function Navbar() {
  const activeTopic = useSearchParams().get("topic");

  return (
    <header className="w-full border-b border-stone-border bg-white">
      <div className="flex h-7 items-center justify-between bg-ink px-6 font-sans text-[0.68rem] text-parchment/55 lg:px-10 xl:px-14">
        <p className="tracking-wide">Monday, 1 June 2026</p>
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

      <div className="flex items-end justify-between gap-8 px-6 py-6 lg:px-10 xl:px-14">
        <Link href="/" className="min-w-0" aria-label="Paris Match homepage">
          <div className="font-display text-4xl font-black uppercase leading-none tracking-[-0.055em] text-ink sm:text-5xl">
            Paris<span className="text-rouge">Match</span>
          </div>
          <div className="mt-1 flex items-center gap-2 font-sans text-[0.62rem] font-medium uppercase tracking-[0.38em] text-ink-muted">
            <span>Monde</span>
            <span className="h-1.5 w-8 bg-rouge" aria-hidden="true" />
          </div>
        </Link>

        <div className="hidden max-w-narrow border-l border-stone-divider pl-6 text-right lg:block">
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.22em] text-stone-editorial">
            Edition spéciale
          </p>
          <p className="mt-1 font-serif text-sm italic text-ink-muted">
            International reporting, curated with a Paris Match eye.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/#latest-stories"
            className="grid h-10 w-10 place-items-center text-xl text-ink transition-colors hover:text-rouge"
            aria-label="Search"
          >
            <span aria-hidden="true">⌕</span>
          </Link>
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
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={
              activeTopic === item.query || (!activeTopic && item.label === "All")
                ? "nav-link-active py-3"
                : "nav-link py-3"
            }
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
