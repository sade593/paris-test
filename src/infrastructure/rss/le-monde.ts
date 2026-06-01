import { XMLParser } from "fast-xml-parser";

import {
  Article,
  DEFAULT_ARTICLE_AUTHOR,
  DEFAULT_ARTICLE_CATEGORY,
  FALLBACK_ARTICLE_IMAGE,
} from "@/domain/article";

const LE_MONDE_RSS_URL = "https://www.lemonde.fr/international/rss_full.xml";
const FEED_REVALIDATE_SECONDS = 60 * 30;

type RssItem = Record<string, unknown>;

type RssDocument = {
  rss?: {
    channel?: {
      item?: RssItem | RssItem[];
    };
  };
};

const parser = new XMLParser({
  attributeNamePrefix: "@_",
  ignoreAttributes: false,
  processEntities: true,
});

export async function getLeMondeArticles(): Promise<Article[]> {
  const response = await fetch(LE_MONDE_RSS_URL, {
    next: { revalidate: FEED_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Unable to fetch Le Monde RSS feed: ${response.status}`);
  }

  return parseLeMondeFeed(await response.text());
}

export function parseLeMondeFeed(xml: string): Article[] {
  const document = parser.parse(xml) as RssDocument;
  const rawItems = document.rss?.channel?.item;
  const items = Array.isArray(rawItems) ? rawItems : rawItems ? [rawItems] : [];

  return items.map(normalizeRssItem).filter((article) => article.title);
}

function normalizeRssItem(item: RssItem, index: number): Article {
  const title = textValue(item.title, "Untitled article");
  const sourceUrl = textValue(item.link, "");
  const description = cleanText(textValue(item.description, title));
  const content = cleanText(
    textValue(item["content:encoded"], description || title),
  );
  const publishedAt = normalizeDate(textValue(item.pubDate, ""));
  const category = textValue(item.category, DEFAULT_ARTICLE_CATEGORY);
  const author = textValue(
    item["dc:creator"] ?? item.author,
    DEFAULT_ARTICLE_AUTHOR,
  );
  const imageUrl = extractImageUrl(item) ?? FALLBACK_ARTICLE_IMAGE;

  return {
    slug: buildSlug(title, sourceUrl || String(index)),
    title: cleanText(title),
    description,
    content,
    imageUrl,
    publishedAt,
    author: cleanText(author),
    category: cleanText(category),
    sourceUrl,
  };
}

function extractImageUrl(item: RssItem): string | null {
  const candidates = [
    item["media:content"],
    item["media:thumbnail"],
    item.enclosure,
  ];

  for (const candidate of candidates) {
    const value = Array.isArray(candidate) ? candidate[0] : candidate;

    if (isRecord(value)) {
      const url = textValue(value["@_url"], "");

      if (url) {
        return url;
      }
    }
  }

  return null;
}

function buildSlug(title: string, stableSeed: string): string {
  const readablePart =
    cleanText(title)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 80) || "article";

  return `${readablePart}-${shortHash(stableSeed)}`;
}

function shortHash(value: string): string {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash.toString(36);
}

function normalizeDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString();
  }

  return date.toISOString();
}

function cleanText(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function textValue(value: unknown, fallback: string): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value).trim() || fallback;
  }

  if (isRecord(value) && typeof value["#text"] === "string") {
    return value["#text"].trim() || fallback;
  }

  return fallback;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
