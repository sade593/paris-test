export const siteConfig = {
  name: "Paris Match International",
  description:
    "A visual international news experience powered by the Le Monde RSS feed.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001",
  locale: "en_US",
};

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}
