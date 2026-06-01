import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config/site";
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
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const jsonLd = buildArticleJsonLd(article);

  return (
    <main className="min-h-screen bg-[#f8f6f1] text-neutral-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <header className="bg-neutral-950 text-white">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:py-12">
            <div className="order-2 pb-4 lg:order-1 lg:pb-10">
              <Link
                href="/"
                className="text-sm font-semibold uppercase tracking-[0.22em] text-red-300 outline-none hover:text-white focus-visible:text-white"
              >
                Back to homepage
              </Link>
              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.22em] text-red-300">
                {article.category}
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
                {article.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
                {article.description}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-300">
                <p className="font-semibold text-white">By {article.author}</p>
                <span aria-hidden="true">/</span>
                <time dateTime={article.publishedAt}>
                  {formatArticleDate(article.publishedAt)}
                </time>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-800">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,44rem)_18rem] lg:py-16">
          <div className="bg-white p-6 shadow-sm sm:p-10">
            <p className="text-xl leading-9 text-neutral-800 first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:font-semibold first-letter:leading-[0.85] first-letter:text-red-700">
              {article.content}
            </p>
          </div>

          <aside className="h-fit border border-neutral-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Article details
            </h2>
            <dl className="mt-5 grid gap-4 text-sm">
              <div>
                <dt className="font-semibold text-neutral-950">Category</dt>
                <dd className="mt-1 text-neutral-600">{article.category}</dd>
              </div>
              <div>
                <dt className="font-semibold text-neutral-950">Published</dt>
                <dd className="mt-1 text-neutral-600">
                  <time dateTime={article.publishedAt}>
                    {formatArticleDate(article.publishedAt)}
                  </time>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-neutral-950">Source</dt>
                <dd className="mt-1">
                  {article.sourceUrl ? (
                    <a
                      href={article.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-red-700 underline-offset-4 hover:underline"
                    >
                      Read on Le Monde
                    </a>
                  ) : (
                    <span className="text-neutral-600">Le Monde RSS</span>
                  )}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </article>
    </main>
  );
}
