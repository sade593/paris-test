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
    <section
      className="border-t border-neutral-200 bg-neutral-50 py-12 sm:py-16"
      aria-labelledby="latest-stories"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-700">
              Latest coverage
            </p>
            <h2
              id="latest-stories"
              className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl"
            >
              International stories, filtered your way
            </h2>
          </div>
          <form className="grid gap-3 sm:grid-cols-[minmax(0,18rem)_12rem]">
            <label className="grid gap-2 text-sm font-medium text-neutral-800">
              <span>Search articles</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                placeholder="Title, author, description"
                className="h-11 border border-neutral-300 bg-white px-3 text-base text-neutral-950 outline-none transition focus:border-red-700 focus:ring-2 focus:ring-red-700/20"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-neutral-800">
              <span>Category</span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-11 border border-neutral-300 bg-white px-3 text-base text-neutral-950 outline-none transition focus:border-red-700 focus:ring-2 focus:ring-red-700/20"
              >
                <option value="All">All</option>
                {categories.map((categoryName) => (
                  <option key={categoryName} value={categoryName}>
                    {categoryName}
                  </option>
                ))}
              </select>
            </label>
          </form>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <p className="border border-neutral-200 bg-white p-8 text-neutral-700">
            No articles match the selected filters.
          </p>
        )}
      </div>
    </section>
  );
}
