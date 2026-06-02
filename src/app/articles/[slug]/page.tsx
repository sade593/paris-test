import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ReadingProgress } from "@/components/article/reading-progress";
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
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <figure className="border-b border-stone-divider bg-[#eee7dc] px-6 pt-8 pb-5 lg:px-10 xl:px-14">
          <div className="mx-auto max-w-editorial">
            <div className="relative aspect-[16/7] w-full overflow-hidden bg-parchment-warm">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                priority
                quality={82}
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3 font-sans text-[0.68rem] uppercase tracking-[0.14em] text-stone-editorial">
              <span>Image source: Le Monde RSS</span>
              <span>{article.category}</span>
            </figcaption>
          </div>
        </figure>

        <header className="mx-auto max-w-article border-b border-stone-divider px-6 py-10">
          <nav
            className="mb-8 flex min-w-0 flex-wrap items-center gap-2 font-sans text-[0.68rem] uppercase tracking-[0.14em] text-stone-editorial"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-rouge">
              Accueil
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={`/?topic=${article.category.toLowerCase()}#latest-stories`}
              className="transition-colors hover:text-rouge"
            >
              {article.category}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="max-w-[28ch] truncate text-ink-muted">
              {article.title}
            </span>
          </nav>

          <p className="category-label mb-4">{article.category}</p>
          <h1 className="headline-display mb-6 text-balance text-[clamp(2rem,3.5vw,3rem)]">
            {article.title}
          </h1>
          <p className="body-editorial mb-7 text-[1.12rem] text-ink-muted">
            {article.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 border-t border-stone-border pt-5 sm:gap-6">
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
        </header>

        <div className="mx-auto max-w-article border-b border-stone-divider px-6 py-14">
            <div className="article-prose">
              <p className="text-[1.18rem] leading-[1.9] first-letter:float-left first-letter:mr-4 first-letter:font-display first-letter:text-7xl first-letter:font-black first-letter:leading-[0.82] first-letter:text-rouge">
                {article.content}
              </p>
            </div>

            <blockquote className="my-10 border-l-4 border-rouge pl-6 font-display text-[1.4rem] font-black leading-tight text-ink italic">
              “Images, context and emotion shape how this story lands.”
            </blockquote>

            {article.sourceUrl ? (
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-rouge"
              >
                Read original source <span aria-hidden="true">→</span>
              </a>
            ) : null}
        </div>
      </article>

      {moreArticles.length > 0 ? (
        <aside className="mx-auto max-w-article px-6 py-12" aria-labelledby="more-stories">
          <div className="section-header mb-2">
            <h2 id="more-stories" className="section-title">More stories</h2>
          </div>
          <div>
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
        </aside>
      ) : null}

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
