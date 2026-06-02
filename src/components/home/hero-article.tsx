import Image from "next/image";
import Link from "next/link";

import { Article } from "@/domain/article";
import { formatArticleDate } from "@/features/articles/article-formatters";

type HeroArticleProps = {
  article: Article;
};

export function HeroArticle({ article }: HeroArticleProps) {
  return (
    <article className="group relative min-h-[420px] overflow-hidden bg-ink ring-1 ring-ink/10 md:min-h-[520px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(200,16,46,0.32),transparent_32%),linear-gradient(135deg,#0d0d0d_0%,#15100f_48%,#3a0712_100%)] md:hidden" />
      <div className="absolute inset-0 hidden bg-parchment-warm md:block">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          sizes="(max-width: 1279px) calc(100vw - 3rem), calc(100vw - 31rem)"
          quality={78}
          className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="hero-overlay" />

      <div className="absolute right-6 bottom-7 left-6 z-10 max-w-[760px] sm:right-auto md:right-8 md:bottom-8 md:left-8 lg:bottom-10 lg:left-10">
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
