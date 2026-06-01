import Image from "next/image";
import Link from "next/link";

import { ArticleFilters } from "@/features/articles/article-filters";
import { formatArticleDate } from "@/features/articles/article-formatters";
import { getArticles, getCategories } from "@/features/articles/article-queries";

export const revalidate = 1800;

export default async function Home() {
  const articles = await getArticles();
  const [heroArticle, ...secondaryArticles] = articles;
  const categories = getCategories(articles);

  if (!heroArticle) {
    return (
      <main className="grid min-h-screen place-items-center bg-neutral-950 px-5 text-white">
        <div className="max-w-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-300">
            Paris Match
          </p>
          <h1 className="mt-4 text-4xl font-semibold">
            No articles are available right now.
          </h1>
          <p className="mt-4 text-neutral-300">
            Please try again later while the newsroom feed refreshes.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <section className="bg-neutral-950 text-white" aria-labelledby="top-story">
        <div className="mx-auto grid min-h-[86vh] w-full max-w-7xl items-end gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:py-10">
          <div className="pb-6 lg:pb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-red-300">
              Paris Match / International
            </p>
            <h1
              id="top-story"
              className="mt-5 max-w-4xl text-5xl font-semibold leading-none tracking-tight sm:text-7xl lg:text-8xl"
            >
              The world in focus
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
              A fast, visual digest of international reporting, refreshed from
              Le Monde and shaped for an editorial reading experience.
            </p>
          </div>

          <article className="border border-white/15 bg-white text-neutral-950">
            <Link
              href={`/articles/${heroArticle.slug}`}
              className="group block outline-none"
              aria-label={`Read top story: ${heroArticle.title}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                <Image
                  src={heroArticle.imageUrl}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 sm:p-7">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-red-700">
                  <span>{heroArticle.category}</span>
                  <span aria-hidden="true">/</span>
                  <time dateTime={heroArticle.publishedAt}>
                    {formatArticleDate(heroArticle.publishedAt)}
                  </time>
                </div>
                <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  {heroArticle.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-neutral-600">
                  {heroArticle.description}
                </p>
                <p className="mt-5 text-sm font-semibold text-neutral-950">
                  By {heroArticle.author}
                </p>
              </div>
            </Link>
          </article>
        </div>
      </section>

      <ArticleFilters articles={secondaryArticles} categories={categories} />
    </main>
  );
}
