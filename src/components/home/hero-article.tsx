import Image from "next/image";
import Link from "next/link";

import { Article } from "@/domain/article";
import { formatArticleDate } from "@/features/articles/article-formatters";

type HeroArticleProps = {
  article: Article;
};

export function HeroArticle({ article }: HeroArticleProps) {
  return (
    <article className="group relative min-h-[460px] overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-parchment-warm">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          sizes="100vw"
          className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
          priority
        />
      </div>
      <div className="hero-overlay" />

      <div className="absolute right-8 bottom-8 left-8 z-10 max-w-[720px] sm:right-auto">
        <p className="mb-4 inline-flex bg-rouge px-3 py-1 font-sans text-[0.65rem] font-medium uppercase tracking-[0.1em] text-white">
          {article.category}
        </p>
        <h1 className="headline-white mb-3 max-w-[700px] text-balance text-[clamp(2rem,3.8vw,3.35rem)]">
          {article.title}
        </h1>
        <p className="body-sm clip-2 mb-5 font-serif text-base text-parchment/85">
          {article.description}
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="font-sans text-[0.68rem] font-medium uppercase tracking-[0.12em] text-parchment/80">
            By {article.author}
          </p>
          <span className="h-1 w-1 rounded-full bg-parchment/40" aria-hidden="true" />
          <time
            className="font-sans text-[0.68rem] text-parchment/60"
            dateTime={article.publishedAt}
          >
            {formatArticleDate(article.publishedAt)}
          </time>
          <span className="h-1 w-1 rounded-full bg-parchment/40" aria-hidden="true" />
          <span className="font-sans text-[0.68rem] text-parchment/60">
            8 min read
          </span>
        </div>
        <Link
          href={`/articles/${article.slug}`}
          className="absolute inset-0"
          aria-label={`Read article: ${article.title}`}
        />
      </div>
    </article>
  );
}
