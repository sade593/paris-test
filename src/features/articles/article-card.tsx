import Image from "next/image";
import Link from "next/link";

import { Article } from "@/domain/article";
import { formatArticleDate } from "@/features/articles/article-formatters";

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group grid h-full grid-rows-[auto_1fr] overflow-hidden border border-neutral-200 bg-white">
      <Link
        href={`/articles/${article.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-neutral-100"
        aria-label={`Read ${article.title}`}
      >
        <Image
          src={article.imageUrl}
          alt=""
          fill
          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-red-700">
          <span>{article.category}</span>
          <span aria-hidden="true">/</span>
          <time dateTime={article.publishedAt}>
            {formatArticleDate(article.publishedAt)}
          </time>
        </div>
        <h3 className="text-xl font-semibold leading-tight text-neutral-950">
          <Link
            href={`/articles/${article.slug}`}
            className="outline-none hover:text-red-700 focus-visible:text-red-700"
          >
            {article.title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm leading-6 text-neutral-600">
          {article.description}
        </p>
        <p className="mt-auto text-sm font-medium text-neutral-900">
          By {article.author}
        </p>
      </div>
    </article>
  );
}
