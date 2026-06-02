import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { HeroArticle } from "@/components/home/hero-article";
import { NewsletterSignup } from "@/components/home/newsletter-signup";
import { absoluteUrl, siteConfig } from "@/config/site";
import { ArticleFilters } from "@/features/articles/article-filters";
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
        <section aria-labelledby="top-story">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex items-center gap-3">
                <span className="h-0.5 w-8 bg-rouge" aria-hidden="true" />
                <p className="font-sans text-label-lg font-medium uppercase tracking-[0.24em] text-rouge">
                  Featured story
                </p>
              </div>
            </div>
            <HeroArticle article={heroArticle} />
          </div>
        </section>

        <section className="mt-16 border-t-2 border-ink pt-8">
          <div>
            <Suspense fallback={null}>
              <ArticleFilters
                articles={secondaryArticles.slice(0, 12)}
                categories={categories}
              />
            </Suspense>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-narrow">
          <NewsletterSignup />
        </section>
      </div>
    </main>
  );
}
