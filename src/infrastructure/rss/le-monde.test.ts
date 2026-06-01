import { describe, expect, it } from "vitest";

import {
  DEFAULT_ARTICLE_AUTHOR,
  DEFAULT_ARTICLE_CATEGORY,
  FALLBACK_ARTICLE_IMAGE,
} from "@/domain/article";
import { parseLeMondeFeed } from "@/infrastructure/rss/le-monde";

describe("parseLeMondeFeed", () => {
  it("normalizes RSS items into article entities", () => {
    const articles = parseLeMondeFeed(`
      <rss>
        <channel>
          <item>
            <title>Un été politique à Paris</title>
            <link>https://www.lemonde.fr/example/article-1.html</link>
            <description><![CDATA[<p>Une description courte.</p>]]></description>
            <content:encoded><![CDATA[<p>Le contenu complet de l'article.</p>]]></content:encoded>
            <pubDate>Mon, 01 Jun 2026 08:30:00 GMT</pubDate>
            <category>Europe</category>
            <dc:creator>Le Monde avec AFP</dc:creator>
            <media:content url="https://img.lemde.fr/story.jpg" />
          </item>
        </channel>
      </rss>
    `);

    expect(articles).toHaveLength(1);
    expect(articles[0]).toMatchObject({
      title: "Un été politique à Paris",
      description: "Une description courte.",
      content: "Le contenu complet de l'article.",
      publishedAt: "2026-06-01T08:30:00.000Z",
      category: "Europe",
      author: "Le Monde avec AFP",
      imageUrl: "https://img.lemde.fr/story.jpg",
      sourceUrl: "https://www.lemonde.fr/example/article-1.html",
    });
    expect(articles[0].slug).toMatch(/^un-ete-politique-a-paris-/);
  });

  it("uses fallbacks when optional RSS fields are missing", () => {
    const articles = parseLeMondeFeed(`
      <rss>
        <channel>
          <item>
            <title>Article minimal</title>
            <link>https://www.lemonde.fr/example/article-2.html</link>
            <pubDate>not a date</pubDate>
          </item>
        </channel>
      </rss>
    `);

    expect(articles[0]).toMatchObject({
      title: "Article minimal",
      description: "Article minimal",
      content: "Article minimal",
      category: DEFAULT_ARTICLE_CATEGORY,
      author: DEFAULT_ARTICLE_AUTHOR,
      imageUrl: FALLBACK_ARTICLE_IMAGE,
    });
    expect(Number.isNaN(new Date(articles[0].publishedAt).getTime())).toBe(
      false,
    );
  });
});
