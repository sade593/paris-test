import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config/site";
import { ArticleCard } from "@/features/articles/article-card";
import { formatArticleDate } from "@/features/articles/article-formatters";
import { getArticleBySlug, getArticles } from "@/features/articles/article-queries";
import {
  articleImageUrl,
  articleUrl,
  buildArticleJsonLd,
} from "@/features/articles/article-seo";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 1800;

export async function generateStaticParams() {
  const articles = await getArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article not found | Paris Match",
    };
  }

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: articleUrl(article),
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: articleUrl(article),
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author],
      section: article.category,
      images: [
        {
          url: articleImageUrl(article),
          width: 1200,
          height: 800,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [articleImageUrl(article)],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const articles = await getArticles();
  const article = articles.find((item) => item.slug === slug) ?? null;

  if (!article) {
    notFound();
  }

  const jsonLd = buildArticleJsonLd(article);
  const relatedArticles = articles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);
  const moreArticles = articles
    .filter((item) => item.slug !== article.slug)
    .slice(3, 8);

  return (
    <main id="top" className="min-h-screen bg-[#fffefa] text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <header className="grid min-h-[calc(100vh-8rem)] border-b border-stone-divider lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-between bg-parchment px-6 py-10 lg:px-10 xl:px-14">
            <div>
              <Link href="/" className="btn-ghost mb-12">
                Back to homepage
              </Link>
              <p className="category-label mb-5">{article.category}</p>
              <h1 className="headline-display mb-6 max-w-[12ch] text-balance text-[clamp(2.25rem,4.6vw,4.65rem)]">
                {article.title}
              </h1>
              <p className="body-editorial max-w-2xl text-[1.18rem] text-ink-muted">
                {article.description}
              </p>
            </div>

            <div className="mt-12 border-t border-stone-border pt-6">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <p className="font-sans text-[0.72rem] font-medium uppercase tracking-[0.16em] text-ink">
                  By {article.author}
                </p>
                <span className="h-1 w-1 rounded-full bg-rouge" aria-hidden="true" />
                <time className="dateline" dateTime={article.publishedAt}>
                  {formatArticleDate(article.publishedAt)}
                </time>
                <span className="h-1 w-1 rounded-full bg-stone-border" aria-hidden="true" />
                <p className="dateline">5 min de lecture</p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <span className="h-0.5 w-10 bg-rouge" aria-hidden="true" />
                <p className="font-sans text-[0.65rem] uppercase tracking-[0.22em] text-stone-editorial">
                  Paris Match / Visual story
                </p>
              </div>
            </div>
          </div>

          <figure className="flex min-h-[520px] flex-col justify-center bg-ink p-4 lg:p-8">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                priority
                quality={95}
                sizes="(max-width: 1024px) 100vw, 56vw"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3 font-sans text-[0.68rem] uppercase tracking-[0.14em] text-parchment/45">
              <span>Image source: Le Monde RSS</span>
              <span>{article.category}</span>
            </figcaption>
          </figure>
        </header>

        <div className="grid border-b border-stone-divider lg:grid-cols-[minmax(0,1fr)_minmax(0,720px)_minmax(280px,0.42fr)]">
          <aside className="hidden border-r border-stone-divider px-8 py-14 xl:block">
            <div className="sticky top-8">
              <p className="mb-4 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-rouge">
                Story file
              </p>
              <dl className="space-y-5 border-t border-stone-divider pt-5">
                <div>
                  <dt className="eyebrow mb-1">Category</dt>
                  <dd className="font-display text-xl font-bold text-ink">
                    {article.category}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-1">Published</dt>
                  <dd className="font-serif text-sm text-ink-muted">
                    {formatArticleDate(article.publishedAt)}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-1">Source</dt>
                  <dd>
                    {article.sourceUrl ? (
                      <a
                        href={article.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-sans text-label uppercase tracking-widest text-rouge"
                      >
                        Le Monde <span aria-hidden="true">→</span>
                      </a>
                    ) : (
                      <span className="font-serif text-sm text-ink-muted">
                        Le Monde RSS
                      </span>
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>

          <div className="px-6 py-14 lg:px-10">
            <div className="article-prose">
              <p className="text-[1.18rem] leading-[1.9] first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:font-black first-letter:leading-[0.82] first-letter:text-rouge">
                {article.content}
              </p>
            </div>

            <blockquote className="my-12 border-y border-rouge py-8 font-display text-3xl font-black leading-tight text-ink">
              “Images, context and emotion shape how this story lands.”
            </blockquote>

            {article.sourceUrl ? (
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Read original source <span aria-hidden="true">→</span>
              </a>
            ) : null}
          </div>

          <aside className="border-t border-stone-divider bg-parchment/45 px-6 py-10 lg:border-t-0 lg:border-l lg:px-8">
            <div className="sticky top-8">
              <div className="section-header mb-4">
                <h2 className="section-title">More stories</h2>
              </div>
              <div className="space-y-0">
                {moreArticles.map((item, index) => (
                  <Link
                    key={item.slug}
                    href={`/articles/${item.slug}`}
                    className="group grid grid-cols-[2rem_minmax(0,1fr)] gap-4 border-b border-stone-divider py-4"
                  >
                    <span className="font-display text-xl font-black text-parchment-deep group-hover:text-rouge-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="category-label mb-1 inline-block">
                        {item.category}
                      </span>
                      <span className="headline-sm clip-2 block text-[1rem] transition-colors group-hover:text-rouge">
                        {item.title}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </article>

      {relatedArticles.length > 0 ? (
        <section className="px-6 py-14 lg:px-10 xl:px-14" aria-labelledby="related-articles">
          <div className="section-header">
            <h2 id="related-articles" className="section-title">
              Articles similaires
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {relatedArticles.map((relatedArticle, index) => (
              <ArticleCard
                key={relatedArticle.slug}
                article={relatedArticle}
                variant={index === 0 ? "lead" : index === 1 ? "text" : "dark"}
              />
            ))}
          </div>
        </section>
      ) : null}

      <a href="#top" className="btn-primary fixed right-6 bottom-6 p-3" aria-label="Back to top">
        ↑
      </a>
    </main>
  );
}
