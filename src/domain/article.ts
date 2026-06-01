export type Article = {
  slug: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  publishedAt: string;
  author: string;
  category: string;
  sourceUrl: string;
};

export const FALLBACK_ARTICLE_IMAGE = "/paris-match-fallback.svg";
export const DEFAULT_ARTICLE_AUTHOR = "Le Monde";
export const DEFAULT_ARTICLE_CATEGORY = "International";
