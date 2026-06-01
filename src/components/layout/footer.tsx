import Link from "next/link";

const footerGroups = [
  {
    title: "Rubriques",
    links: ["International", "Politique", "Culture", "Images"],
  },
  {
    title: "Services",
    links: ["Newsletter", "Archives", "Application", "Abonnements"],
  },
  {
    title: "Paris Match",
    links: ["A propos", "Redaction", "Contact", "Publicite"],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 bg-ink text-parchment">
      <div className="mx-auto grid max-w-editorial grid-cols-1 gap-10 px-6 py-16 md:grid-cols-4">
        <div>
          <Link href="/" className="font-display text-xl font-black uppercase tracking-tight">
            <span className="text-parchment">PARIS</span>
            <span className="text-rouge">MATCH</span>
          </Link>
          <p className="body-sm mt-3 max-w-[220px] text-sm text-parchment/50">
            News, images and emotion, composed for a fast editorial reading
            experience.
          </p>
          <div className="divider-rouge mt-6 mb-4" />
          <div className="flex gap-4" aria-label="Social links">
            {["X", "IG", "FB"].map((item) => (
              <a
                key={item}
                href="https://www.parismatch.com"
                className="font-sans text-label text-parchment/40 transition-colors hover:text-rouge"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title}>
            <h2 className="mb-4 font-sans text-label uppercase tracking-[0.15em] text-parchment/40">
              {group.title}
            </h2>
            {group.links.map((link) => (
              <Link
                key={link}
                href="/"
                className="mb-2.5 block font-sans text-sm text-parchment/70 transition-colors hover:text-parchment"
              >
                {link}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="border-t border-parchment/10 py-6">
        <div className="mx-auto flex max-w-editorial flex-col gap-4 px-6 md:flex-row md:items-center md:justify-between">
          <p className="dateline text-parchment/30">
            Paris Match technical test - Next.js editorial prototype
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <Link
                key={item}
                href="/"
                className="font-sans text-[0.6875rem] text-parchment/30 transition-colors hover:text-parchment/60"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
