import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Article } from "@/domain/article";
import { ArticleFilters } from "@/features/articles/article-filters";

const articles: Article[] = [
  {
    slug: "europe-story",
    title: "Europe prepares a summit",
    description: "Leaders meet in Brussels.",
    content: "Full article",
    imageUrl: "/paris-match-fallback.svg",
    publishedAt: "2026-06-01T08:30:00.000Z",
    author: "Claire Martin",
    category: "Europe",
    sourceUrl: "https://example.com/europe",
  },
  {
    slug: "culture-story",
    title: "Cinema opens in Cannes",
    description: "Artists gather for a premiere.",
    content: "Full article",
    imageUrl: "/paris-match-fallback.svg",
    publishedAt: "2026-06-02T08:30:00.000Z",
    author: "Marc Durand",
    category: "Culture",
    sourceUrl: "https://example.com/culture",
  },
];

describe("ArticleFilters", () => {
  it("filters articles by search query and category", async () => {
    const user = userEvent.setup();

    render(<ArticleFilters articles={articles} categories={["Culture", "Europe"]} />);

    expect(screen.getByText("Europe prepares a summit")).toBeInTheDocument();
    expect(screen.getByText("Cinema opens in Cannes")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Search articles"), "Claire");

    expect(screen.getByText("Europe prepares a summit")).toBeInTheDocument();
    expect(screen.queryByText("Cinema opens in Cannes")).not.toBeInTheDocument();

    await user.clear(screen.getByLabelText("Search articles"));
    await user.selectOptions(screen.getByLabelText("Category"), "Culture");

    expect(screen.queryByText("Europe prepares a summit")).not.toBeInTheDocument();
    expect(screen.getByText("Cinema opens in Cannes")).toBeInTheDocument();
  });
});
