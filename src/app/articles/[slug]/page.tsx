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

  return (
    <main id="top" className="min-h-screen bg-parchment pt-16 text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <div className="relative aspect-[16/8] w-full overflow-hidden bg-ink sm:aspect-[16/6]">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <header className="mx-auto max-w-article border-b border-stone-divider px-6 pt-10 pb-6">
          <Link href="/" className="btn-ghost mb-8">
            Back to homepage
          </Link>
          <p className="category-label mb-4">{article.category}</p>
          <h1 className="headline-display mb-5 text-display-xl text-balance">
            {article.title}
          </h1>
          <p className="body-editorial mb-6 font-serif text-[1.1rem] text-ink-muted">
            {article.description}
          </p>
          <div className="divider-rouge mb-5" />
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <p className="byline uppercase">By {article.author}</p>
            <span className="h-1 w-1 rounded-full bg-stone-border" aria-hidden="true" />
            <time className="dateline" dateTime={article.publishedAt}>
              {formatArticleDate(article.publishedAt)}
            </time>
            <span className="h-1 w-1 rounded-full bg-stone-border" aria-hidden="true" />
            <p className="dateline">5 min de lecture</p>
          </div>
        </header>

        <div className="mx-auto max-w-article px-6 py-10">
          <div className="article-prose">
            <p>
              {article.content}
            </p>
          </div>
        </div>
      </article>

      <aside className="mx-auto max-w-article px-6 pb-4">
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
      </aside>

      {relatedArticles.length > 0 ? (
        <section className="mx-auto max-w-editorial px-6 py-12" aria-labelledby="related-articles">
          <div className="section-header">
            <h2 id="related-articles" className="section-title">
              Articles similaires
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {relatedArticles.map((relatedArticle) => (
              <ArticleCard key={relatedArticle.slug} article={relatedArticle} />
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
