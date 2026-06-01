import { Article, FALLBACK_ARTICLE_IMAGE } from "@/domain/article";
import { absoluteUrl, siteConfig } from "@/config/site";

export function articleUrl(article: Article): string {
  return absoluteUrl(`/articles/${article.slug}`);
}

export function articleImageUrl(article: Article): string {
  if (article.imageUrl.startsWith("http")) {
    return article.imageUrl;
  }

  return absoluteUrl(
    article.imageUrl === FALLBACK_ARTICLE_IMAGE
      ? FALLBACK_ARTICLE_IMAGE
      : article.imageUrl,
  );
}

export function buildArticleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.description,
    image: [articleImageUrl(article)],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(FALLBACK_ARTICLE_IMAGE),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl(article),
    },
    articleSection: article.category,
    isBasedOn: article.sourceUrl || undefined,
  };
}

export function buildHomepageJsonLd(articles: Article[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "International news articles",
    description: siteConfig.description,
    itemListElement: articles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: articleUrl(article),
      name: article.title,
    })),
  };
}
