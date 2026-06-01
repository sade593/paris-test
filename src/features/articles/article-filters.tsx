"use client";

import { useMemo, useState } from "react";

import { Article } from "@/domain/article";
import { ArticleCard } from "@/features/articles/article-card";

type ArticleFiltersProps = {
  articles: Article[];
  categories: string[];
};

export function ArticleFilters({ articles, categories }: ArticleFiltersProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory =
        category === "All" || article.category === category;
      const searchableText = [
        article.title,
        article.description,
        article.author,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableText.includes(normalizedQuery);
    });
  }, [articles, category, query]);

  return (
    <section aria-labelledby="latest-stories">
      <div className="section-header">
        <h2 id="latest-stories" className="section-title">
          Dernières nouvelles
        </h2>
        <p className="eyebrow hidden sm:block">Filtrer la sélection</p>
      </div>

      <form className="mb-8 grid gap-4 border-b border-stone-divider pb-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <label className="grid gap-2">
          <span className="eyebrow">Search articles</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="search"
            placeholder="Rechercher…"
            className="search-input"
          />
        </label>
        <label className="grid gap-2 md:min-w-52">
          <span className="eyebrow">Category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="search-input"
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

      <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-stone-divider pb-4">
        <span className="eyebrow mr-2">Categories</span>
        <button
          type="button"
          onClick={() => setCategory("All")}
          className={category === "All" ? "tag-active" : "tag"}
        >
          Tout
        </button>
        {categories.map((categoryName) => (
          <button
            key={categoryName}
            type="button"
            onClick={() => setCategory(categoryName)}
            className={category === categoryName ? "tag-active" : "tag"}
          >
            {categoryName}
          </button>
        ))}
      </div>

      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article, index) => (
            <div
              key={article.slug}
              style={{ animationDelay: `${Math.min(index, 8) * 0.05}s` }}
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
