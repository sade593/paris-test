import Image from "next/image";
import Link from "next/link";

import { Article } from "@/domain/article";
import { formatArticleDate } from "@/features/articles/article-formatters";

type HeroArticleProps = {
  article: Article;
};

export function HeroArticle({ article }: HeroArticleProps) {
  return (
    <article className="relative w-full overflow-hidden bg-ink sm:aspect-[16/7] sm:min-h-[520px]">
      <div className="relative aspect-[4/3] overflow-hidden bg-parchment-warm sm:absolute sm:inset-0 sm:aspect-auto">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          sizes="100vw"
          className="object-cover opacity-95 sm:opacity-80"
          priority
        />
      </div>
      <div className="hero-overlay hidden sm:block" />
      <div className="absolute top-0 left-0 hidden h-full w-1 bg-rouge sm:block" />

      <div className="bg-ink px-6 py-8 sm:absolute sm:right-0 sm:bottom-0 sm:left-0 sm:max-w-3xl sm:bg-transparent sm:px-10 sm:pb-12">
        <p className="category-label-dark mb-3">{article.category}</p>
        <h1 className="headline-white mb-4 text-display-2xl text-balance">
          {article.title}
        </h1>
        <p className="body-sm clip-2 mb-6 font-serif text-base text-parchment/80">
          {article.description}
        </p>
        <p className="byline mb-1 uppercase text-parchment/60">
          By {article.author}
        </p>
        <time className="dateline text-parchment/50" dateTime={article.publishedAt}>
          {formatArticleDate(article.publishedAt)}
        </time>
        <div className="mt-6">
          <Link href={`/articles/${article.slug}`} className="btn-rouge">
            Read article <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
