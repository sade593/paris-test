import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { HeroArticle } from "@/components/home/hero-article";
import { absoluteUrl, siteConfig } from "@/config/site";
import { ArticleCardCompact } from "@/features/articles/article-card-compact";
import { ArticleFilters } from "@/features/articles/article-filters";
import { ArticleFeatured } from "@/features/articles/article-featured";
import { getArticles, getCategories } from "@/features/articles/article-queries";
import { buildHomepageJsonLd } from "@/features/articles/article-seo";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "International News in Focus",
  description: siteConfig.description,
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: "International News in Focus",
    description: siteConfig.description,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "International News in Focus",
    description: siteConfig.description,
  },
};

export default async function Home() {
  const articles = await getArticles();
  const [heroArticle, ...secondaryArticles] = articles;
  const mainArticles = secondaryArticles.slice(0, 4);
  const sidebarArticles = secondaryArticles.slice(9, 15);
  const featuredArticles = secondaryArticles.slice(15, 19);
  const trendingArticles = secondaryArticles.slice(0, 5);
  const breakingArticle = secondaryArticles[0] ?? heroArticle;
  const categories = getCategories(articles);
  const jsonLd = buildHomepageJsonLd(articles);

  if (!heroArticle) {
    return (
      <main className="grid min-h-screen place-items-center bg-ink px-5 pt-16 text-parchment">
        <div className="max-w-xl text-center">
          <p className="category-label-dark">
            Paris Match
          </p>
          <h1 className="headline-white mt-4 text-display-lg">
            No articles are available right now.
          </h1>
          <p className="body-sm mt-4 text-parchment/70">
            Please try again later while the newsroom feed refreshes.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="w-full bg-ink px-6 py-2.5 text-parchment lg:px-10 xl:px-14" aria-label="Breaking news">
        <div className="flex items-center gap-5 overflow-hidden">
          <span className="font-sans text-label-lg font-medium uppercase tracking-widest text-rouge">
            Breaking
          </span>
          <span className="h-3 w-px bg-parchment/25" aria-hidden="true" />
          <Link
            href={`/articles/${breakingArticle.slug}`}
            className="truncate font-sans text-[0.68rem] font-light tracking-wide text-parchment/70 transition-colors hover:text-parchment"
          >
            {breakingArticle.title}
          </Link>
        </div>
      </section>

      <div className="w-full bg-[#fffefa] px-6 py-10 ring-1 ring-stone-divider/80 lg:px-10 xl:px-14">
        <section className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_360px]" aria-labelledby="top-story">
          <div>
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
              <span className="h-0.5 w-8 bg-rouge" aria-hidden="true" />
              <p className="font-sans text-label-lg font-medium uppercase tracking-[0.24em] text-rouge">
                Featured story
              </p>
              </div>
              <p className="hidden font-sans text-[0.65rem] uppercase tracking-[0.22em] text-stone-editorial sm:block">
                Visual report / analysis
              </p>
            </div>
            <HeroArticle article={heroArticle} />
          </div>

          <aside className="border-t border-stone-divider bg-parchment/40 p-5 pt-6 xl:border-t-0 xl:border-l xl:bg-transparent xl:p-0 xl:pl-8">
            <div className="mb-4 flex items-center gap-3 border-b border-stone-divider pb-4">
              <span className="font-sans text-label-lg text-rouge" aria-hidden="true">
                ↗
              </span>
              <h2 className="font-sans text-label-lg font-medium uppercase tracking-[0.22em] text-stone-editorial">
                Trending now
              </h2>
            </div>
            <div>
              {trendingArticles.map((article, index) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="group grid grid-cols-[2.3rem_minmax(0,1fr)] gap-4 border-b border-stone-divider py-4"
                >
                  <span className="font-display text-2xl font-black text-parchment-deep transition-colors group-hover:text-rouge-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="category-label mb-2 inline-block">
                      {article.category}
                    </span>
                    <span className="headline-sm clip-2 block text-[1rem] transition-colors group-hover:text-rouge">
                      {article.title}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </aside>
        </section>

        <section className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-3 xl:grid-cols-[1fr_1fr_1fr_360px]">
          <div className="lg:col-span-3">
            <Suspense fallback={null}>
              <ArticleFilters articles={mainArticles} categories={categories} />
            </Suspense>
          </div>

          <aside className="lg:col-span-3 xl:col-span-1 xl:border-l xl:border-stone-divider xl:pl-8">
            <div className="section-header">
              <h2 className="section-title">À la une</h2>
            </div>
            <div>
              {sidebarArticles.map((article) => (
                <ArticleCardCompact key={article.slug} article={article} />
              ))}
            </div>

            <div className="divider-rouge my-6" />

            <form className="bg-ink p-6">
              <h2 className="headline-white mb-2 text-lg">Newsletter</h2>
              <p className="body-sm mb-4 text-sm text-parchment/60">
                Receive the essential international stories in a concise
                editorial briefing.
              </p>
              <label className="sr-only" htmlFor="newsletter-email">
                Email
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Email address"
                className="search-input mb-3 border-white/20 text-parchment placeholder:text-parchment/40 focus:border-parchment"
              />
              <button type="submit" className="btn-rouge w-full justify-center">
                Subscribe
              </button>
            </form>
          </aside>
        </section>

        {featuredArticles.length > 0 ? (
          <section
            id="monde"
            className="mt-14"
            aria-labelledby="politics-section"
          >
            <div className="section-header">
              <h2 id="politics-section" className="section-title">
                Monde & Politique
              </h2>
              <Link href="/" className="btn-ghost text-sm">
                Voir tout <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredArticles.map((article) => (
                <ArticleFeatured key={article.slug} article={article} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
