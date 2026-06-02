import Image from "next/image";
import Link from "next/link";

import { Article } from "@/domain/article";

type ArticleFeaturedProps = {
  article: Article;
};

export function ArticleFeatured({ article }: ArticleFeaturedProps) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group relative block cursor-pointer overflow-hidden bg-parchment-warm"
    >
      <div className="absolute inset-x-0 top-0 border-t-2 border-ink" />
      <div className="absolute top-0 left-0 h-full w-0.5 bg-rouge opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <p className="category-label mb-2">{article.category}</p>
        <h3 className="headline-md clip-2 mb-2 text-[1.2rem] transition-colors group-hover:text-rouge">
          {article.title}
        </h3>
        <p className="body-sm clip-2 mb-3">{article.description}</p>
        <p className="byline uppercase">By {article.author}</p>
      </div>
    </Link>
  );
}
