import Image from "next/image";
import Link from "next/link";

import { Article } from "@/domain/article";
import { formatArticleDate } from "@/features/articles/article-formatters";

type ArticleCardCompactProps = {
  article: Article;
};

export function ArticleCardCompact({ article }: ArticleCardCompactProps) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex cursor-pointer gap-4 border-b border-stone-divider py-4"
    >
      <div className="relative aspect-[3/2] w-28 flex-shrink-0 overflow-hidden bg-parchment-warm">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          quality={60}
          sizes="96px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="category-label mb-1">{article.category}</p>
        <h3 className="headline-sm clip-2 mb-1.5 text-sm leading-snug transition-colors group-hover:text-rouge">
          {article.title}
        </h3>
        <time className="dateline" dateTime={article.publishedAt}>
          {formatArticleDate(article.publishedAt)}
        </time>
      </div>
    </Link>
  );
}
