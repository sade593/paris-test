import Link from "next/link";

type ReadMoreLinkProps = {
  href: string;
};

export function ReadMoreLink({ href }: ReadMoreLinkProps) {
  return (
    <Link
      href={href}
      className="font-sans text-label uppercase tracking-widest text-rouge"
    >
      Lire <span aria-hidden="true">→</span>
    </Link>
  );
}
