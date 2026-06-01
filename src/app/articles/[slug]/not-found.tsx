import Link from "next/link";

export default function ArticleNotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-neutral-950 px-5 text-white">
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-300">
          Article not found
        </p>
        <h1 className="mt-4 text-4xl font-semibold">
          This story is no longer available.
        </h1>
        <p className="mt-4 text-neutral-300">
          The RSS feed may have refreshed, or the link may be outdated.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center bg-white px-5 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-950 outline-none hover:bg-red-100 focus-visible:bg-red-100"
        >
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
