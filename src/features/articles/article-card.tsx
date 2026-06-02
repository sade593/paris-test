import Image from "next/image";
import Link from "next/link";

import { Article } from "@/domain/article";
import { formatArticleDate } from "@/features/articles/article-formatters";
import { ReadMoreLink } from "@/features/articles/read-more-link";

type ArticleCardProps = {
  article: Article;
  variant?: "standard" | "lead" | "horizontal" | "text" | "dark";
};

export function ArticleCard({ article, variant = "standard" }: ArticleCardProps) {
  if (variant === "lead") {
    return (
      <article className="group relative flex min-h-full flex-col overflow-hidden border-t-2 border-ink bg-[#fbfaf7]">
        <Link
          href={`/articles/${article.slug}`}
          className="relative block aspect-[3/2] overflow-hidden bg-parchment-warm"
          aria-label={`Read ${article.title}`}
        >
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            quality={70}
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        <div className="flex flex-1 flex-col border-r border-b border-l border-stone-divider p-6 md:p-8">
          <div className="card-article-meta">
            <span>{article.category}</span>
            <span className="h-1 w-1 rounded-full bg-stone-border" aria-hidden="true" />
            <time className="dateline" dateTime={article.publishedAt}>
              {formatArticleDate(article.publishedAt)}
            </time>
          </div>
          <h3 className="headline-lg mb-4 text-display-md transition-colors duration-200 group-hover:text-rouge">
            <Link href={`/articles/${article.slug}`}>{article.title}</Link>
          </h3>
          <p className="body-editorial clip-4 mb-6">{article.description}</p>
          <div className="mt-auto flex items-center justify-between gap-4 border-t border-stone-divider pt-5">
            <p className="byline uppercase">By {article.author}</p>
            <ReadMoreLink href={`/articles/${article.slug}`} />
          </div>
        </div>
      </article>
    );
  }

  if (variant === "horizontal") {
    return (
      <article className="group grid grid-cols-[minmax(112px,160px)_minmax(0,1fr)] gap-5 border-b border-stone-divider bg-white/50 pb-6">
        <Link
          href={`/articles/${article.slug}`}
          className="relative aspect-[3/2] overflow-hidden bg-parchment-warm"
          aria-label={`Read ${article.title}`}
        >
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            quality={70}
            sizes="128px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        <div className="min-w-0">
          <p className="category-label mb-2">{article.category}</p>
          <h3 className="headline-sm clip-3 mb-2 text-[1.15rem] transition-colors group-hover:text-rouge">
            <Link href={`/articles/${article.slug}`}>{article.title}</Link>
          </h3>
          <p className="body-sm clip-2 mb-3">{article.description}</p>
          <time className="dateline" dateTime={article.publishedAt}>
            {formatArticleDate(article.publishedAt)}
          </time>
        </div>
      </article>
    );
  }

  if (variant === "text") {
    return (
      <article className="group flex min-h-full flex-col border border-stone-divider border-t-2 border-t-rouge bg-parchment-warm">
        <Link
          href={`/articles/${article.slug}`}
          className="relative aspect-[3/2] overflow-hidden bg-parchment-deep"
          aria-label={`Read ${article.title}`}
        >
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            quality={70}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        <div className="flex flex-1 flex-col p-6">
          <p className="category-label mb-4">{article.category}</p>
          <h3 className="headline-md mb-4 text-[1.45rem] transition-colors group-hover:text-rouge">
            <Link href={`/articles/${article.slug}`}>{article.title}</Link>
          </h3>
          <p className="body-sm clip-4 mb-6 text-ink-muted">{article.description}</p>
          <div className="mt-auto flex items-center justify-between gap-4">
            <p className="byline uppercase">By {article.author}</p>
            <ReadMoreLink href={`/articles/${article.slug}`} />
          </div>
        </div>
      </article>
    );
  }

  if (variant === "dark") {
    return (
      <article className="group relative overflow-hidden bg-ink text-parchment">
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            quality={70}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover opacity-55 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />
        </div>
        <div className="flex flex-col border-l-4 border-rouge p-6">
          <p className="category-label-dark mb-4">{article.category}</p>
          <h3 className="headline-white mb-4 text-display-md transition-colors group-hover:text-rouge-muted">
            <Link href={`/articles/${article.slug}`}>{article.title}</Link>
          </h3>
          <p className="body-sm clip-3 mt-auto text-parchment/70">
            {article.description}
          </p>
          <div className="mt-5">
            <ReadMoreLink href={`/articles/${article.slug}`} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="card-article group animate-fade-up border-b border-stone-divider pb-6">
      <Link
        href={`/articles/${article.slug}`}
        className="card-article-image relative block"
        aria-label={`Read ${article.title}`}
      >
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          quality={70}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col">
        <div className="card-article-meta">
          <span>{article.category}</span>
          <span className="h-1 w-1 rounded-full bg-stone-border" aria-hidden="true" />
          <time className="dateline" dateTime={article.publishedAt}>
            {formatArticleDate(article.publishedAt)}
          </time>
        </div>
        <h3 className="headline-sm clip-2 mb-2 text-[1.125rem] transition-colors duration-200 group-hover:text-rouge">
          <Link
            href={`/articles/${article.slug}`}
            className="outline-none focus-visible:text-rouge"
          >
            {article.title}
          </Link>
        </h3>
        <p className="body-sm clip-article mb-3">
          {article.description}
        </p>
        <p className="byline mt-auto uppercase">
          By {article.author}
        </p>
        <div className="divider-editorial mt-4 pt-4">
          <ReadMoreLink href={`/articles/${article.slug}`} />
        </div>
      </div>
    </article>
  );
}
