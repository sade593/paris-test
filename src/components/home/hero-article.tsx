import Image from "next/image";
import Link from "next/link";

import { Article } from "@/domain/article";
import { formatArticleDate } from "@/features/articles/article-formatters";

type HeroArticleProps = {
  article: Article;
};

export function HeroArticle({ article }: HeroArticleProps) {
  return (
    <article className="relative w-full overflow-hidden bg-ink sm:aspect-[16/7] sm:min-h-[560px]">
      <div className="relative aspect-[4/3] overflow-hidden bg-parchment-warm sm:absolute sm:inset-0 sm:aspect-auto">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          sizes="100vw"
          className="object-cover opacity-90 sm:opacity-75"
          priority
        />
      </div>
      <div className="hero-overlay" />
      <div className="absolute inset-y-0 left-0 z-10 w-1.5 bg-rouge sm:w-2" />
      <div className="pointer-events-none absolute top-10 right-10 z-10 hidden max-w-48 border-t-2 border-rouge pt-4 text-right xl:block">
        <p className="font-display text-4xl font-black uppercase leading-none text-parchment/90">
          Paris
          <br />
          Match
        </p>
        <p className="mt-3 font-sans text-[0.65rem] uppercase tracking-[0.28em] text-parchment/45">
          International
        </p>
      </div>

      <div className="relative z-10 bg-ink px-10 py-8 sm:absolute sm:right-0 sm:bottom-0 sm:left-0 sm:max-w-[780px] sm:bg-transparent sm:px-14 sm:pb-14 lg:px-16">
        <p className="category-label-dark mb-3">{article.category}</p>
        <h1 className="headline-white mb-5 max-w-[760px] text-balance text-[clamp(2.15rem,4.05vw,3.75rem)]">
          {article.title}
        </h1>
        <p className="body-sm clip-2 mb-6 font-serif text-base text-parchment/80">
          {article.description}
        </p>
        <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
          <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.16em] text-parchment/80">
            By {article.author}
          </p>
          <span className="mb-1 h-1 w-1 bg-rouge" aria-hidden="true" />
          <time
            className="font-sans text-[0.68rem] uppercase tracking-[0.12em] text-parchment/45"
            dateTime={article.publishedAt}
          >
            {formatArticleDate(article.publishedAt)}
          </time>
        </div>
        <div className="mt-6">
          <Link href={`/articles/${article.slug}`} className="btn-rouge">
            Read article <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
