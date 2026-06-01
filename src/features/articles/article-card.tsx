import Image from "next/image";
import Link from "next/link";

import { Article } from "@/domain/article";
import { formatArticleDate } from "@/features/articles/article-formatters";

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="card-article group animate-fade-up">
      <Link
        href={`/articles/${article.slug}`}
        className="card-article-image relative block"
        aria-label={`Read ${article.title}`}
      >
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
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
          <Link
            href={`/articles/${article.slug}`}
            className="font-sans text-label uppercase tracking-widest text-rouge"
          >
            Read more <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
