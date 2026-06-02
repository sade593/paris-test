"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Article } from "@/domain/article";
import { ArticleCard } from "@/features/articles/article-card";

type ArticleFiltersProps = {
  articles: Article[];
  categories: string[];
};

export function ArticleFilters({
  articles,
  categories,
}: ArticleFiltersProps) {
  const searchParams = useSearchParams();
  const topicCategory = getTopicCategory(searchParams?.get("topic") ?? null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const selectedCategory = topicCategory || category;

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "All" || article.category === selectedCategory;
      const searchableText = [
        article.title,
        article.description,
        article.author,
        article.category,
        article.content,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableText.includes(normalizedQuery);
    });
  }, [articles, query, selectedCategory]);

  return (
    <section aria-labelledby="latest-stories">
      <div className="section-header">
        <div>
          <p className="mb-2 font-sans text-[0.62rem] uppercase tracking-[0.2em] text-rouge">
            The briefing
          </p>
          <h2 id="latest-stories" className="section-title">
            Dernières nouvelles
          </h2>
        </div>
        <p className="hidden items-center gap-2 font-sans text-[0.62rem] font-light uppercase tracking-[0.18em] text-stone-editorial/70 sm:flex">
          <span className="h-px w-5 bg-stone-border" aria-hidden="true" />
          {filteredArticles.length} stories selected
        </p>
      </div>

      <div className="mb-8 grid gap-6 border-b border-stone-divider pb-6 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)]">
        <p className="body-editorial max-w-narrow text-[1rem]">
          A curated sweep through the day&apos;s international agenda, mixing
          fast reads, visual stories, and deeper context from the live RSS feed.
        </p>

        <form className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <label className="grid gap-2">
            <span className="eyebrow">Search articles</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="search"
              placeholder={topicCategory ? `Category: ${topicCategory}` : "Rechercher…"}
              className="search-input"
            />
          </label>
          <label className="grid gap-2 md:min-w-52">
            <span className="eyebrow">Category</span>
            <select
              value={selectedCategory}
              onChange={(event) => setCategory(event.target.value)}
              className="search-input"
              disabled={Boolean(topicCategory)}
            >
              <option value="All">Tout</option>
              {categories.map((categoryName) => (
                <option key={categoryName} value={categoryName}>
                  {categoryName}
                </option>
              ))}
            </select>
          </label>
        </form>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-stone-divider pb-4">
        <span className="eyebrow mr-2">Categories</span>
        <button
          type="button"
          onClick={() => setCategory("All")}
          className={selectedCategory === "All" ? "tag-active" : "tag"}
        >
          Tout
        </button>
        {categories.map((categoryName) => (
          <button
            key={categoryName}
            type="button"
            onClick={() => setCategory(categoryName)}
            className={selectedCategory === categoryName ? "tag-active" : "tag"}
            disabled={Boolean(topicCategory)}
          >
            {categoryName}
          </button>
        ))}
      </div>

      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <div
              key={article.slug}
              className="animate-fade-up"
            >
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      ) : (
        <p className="border border-stone-border bg-parchment-warm p-8 font-serif text-stone-editorial">
          No articles match the selected filters.
        </p>
      )}
    </section>
  );
}

const topicCategories: Record<string, string> = {
  politics: "Politics",
  international: "International",
  culture: "Culture",
  society: "Society",
  technology: "Technology",
  environment: "Environment",
};

function getTopicCategory(topic: string | null): string {
  if (!topic) {
    return "";
  }

  return topicCategories[topic] ?? "";
}
