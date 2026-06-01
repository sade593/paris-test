import { Article } from "@/domain/article";
import { getLeMondeArticles } from "@/infrastructure/rss/le-monde";

export async function getArticles(): Promise<Article[]> {
  return getLeMondeArticles();
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getArticles();

  return articles.find((article) => article.slug === slug) ?? null;
}

export function getCategories(articles: Article[]): string[] {
  return Array.from(new Set(articles.map((article) => article.category))).sort(
    (left, right) => left.localeCompare(right),
  );
}
