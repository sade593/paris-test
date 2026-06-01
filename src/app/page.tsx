import type { Metadata } from "next";
import Link from "next/link";

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
  const mainArticles = secondaryArticles.slice(0, 9);
  const sidebarArticles = secondaryArticles.slice(9, 15);
  const featuredArticles = secondaryArticles.slice(15, 19);
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
    <main className="min-h-screen bg-parchment pt-16 text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-ink px-6 py-2 text-parchment" aria-label="Breaking news">
        <div className="mx-auto flex max-w-editorial items-center gap-5 overflow-hidden">
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

      <section className="pt-0 pb-12" aria-labelledby="top-story">
        <HeroArticle article={heroArticle} />
      </section>

      <section className="mx-auto grid max-w-editorial grid-cols-1 gap-8 px-6 pt-4 lg:grid-cols-3 xl:grid-cols-[1fr_1fr_1fr_320px]">
        <div className="lg:col-span-3">
          <ArticleFilters articles={mainArticles} categories={categories} />
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
              Receive the essential international stories in a concise editorial
              briefing.
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
          className="mx-auto mt-12 max-w-editorial px-6"
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
    </main>
  );
}
