# Paris Match Technical Test

A small editorial website built with Next.js for the Paris Match Senior Next.js Developer technical test.

The project presents a lightweight media experience inspired by Paris Match's digital identity: visual storytelling, clear editorial hierarchy, fast article discovery, and SEO-friendly article pages. It uses the Le Monde international RSS feed as its content source and is designed around static rendering, accessible markup, clean architecture, and automated tests.

## Website Overview

The application is a two-page media website:

- **Homepage**: displays a curated list of international news articles, with one story promoted as the main hero article.
- **Article detail page**: renders the selected article with complete metadata, source attribution, optimized imagery, and structured data.
- **Search and filtering**: lets readers quickly narrow the article list by title, description, author, or category.
- **Editorial presentation**: uses a clean, responsive layout with strong image treatment, readable typography, semantic sections, and accessible navigation.

The goal is not to reproduce Paris Match visually one-to-one, but to create a modern editorial surface that respects the brand's emphasis on image-led storytelling and readable narrative structure.

## Tech Stack

- **Next.js App Router**
- **TypeScript**
- **React Server Components**
- **Tailwind CSS**
- **Le Monde RSS feed**
- **fast-xml-parser**
- **Vitest**
- **Testing Library**
- **Playwright**

## Architecture

The codebase is organized around separation of concerns:

- `src/app`: route entry points, layouts, metadata, and page composition.
- `src/domain`: core article types and domain constants.
- `src/infrastructure`: external data access, including RSS fetching and normalization.
- `src/features`: article-specific queries, UI, and behavior.
- `public`: static assets, including the fallback editorial image.

This structure keeps framework concerns, data fetching, domain modeling, and presentation logic separate. It also makes the RSS source replaceable without forcing page-level rewrites.

## Data Source

Articles are loaded from the Le Monde international RSS feed:

```text
https://www.lemonde.fr/international/rss_full.xml
```

RSS items are normalized into a stable internal `Article` model:

- `slug`
- `title`
- `description`
- `content`
- `imageUrl`
- `publishedAt`
- `author`
- `category`
- `sourceUrl`

The normalization layer includes defensive fallbacks for missing RSS fields such as image, author, category, description, and malformed publication dates.

## SEO Strategy

The project is designed for strong discoverability and rich sharing previews:

- Route-level metadata with meaningful titles and descriptions.
- Open Graph metadata for article sharing.
- Twitter Card metadata.
- Canonical URLs using `NEXT_PUBLIC_SITE_URL` when provided.
- `NewsArticle` JSON-LD structured data for article pages.
- `ItemList` JSON-LD structured data for the homepage article list.
- Semantic HTML with clear heading hierarchy.
- Accessible links, dates, image alt text, and landmarks.

The article detail pages expose structured data so search engines and social platforms can better understand each story's headline, description, author, category, publication date, image, canonical URL, and original source.

## Performance Strategy

Performance choices are focused on Core Web Vitals:

- Static Site Generation and Incremental Static Regeneration for fast page delivery.
- Server-side RSS fetching with controlled revalidation.
- `next/image` for responsive image optimization.
- Lightweight custom Tailwind UI instead of a heavy component library.
- Minimal client-side JavaScript, limited to interactive search and filtering.
- Semantic, responsive layouts that avoid layout shift.

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server on port `3001`:

```bash
npm run dev -- -p 3001
```

Open:

```text
http://localhost:3001
```

Ports `3000` and `3002` are intentionally avoided because they are reserved for other local projects.

Optional environment variable:

```bash
NEXT_PUBLIC_SITE_URL=https://your-deployment-url.example
```

This value is used for canonical URLs, Open Graph URLs, and JSON-LD absolute links. If it is not set, the app defaults to `http://localhost:3001`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm test
npm run test:e2e
```

## Testing

The test suite focuses on meaningful behavior rather than snapshot noise:

- **Unit tests**: RSS normalization, slug generation, missing-field fallbacks, and date handling.
- **Integration tests**: article filtering by search query and category.
- **End-to-end tests**: homepage-to-article navigation with Playwright.

If Playwright browsers are not installed locally, run:

```bash
npx playwright install chromium
```

Before submitting the project, run:

```bash
npm run lint
npm test
npm run test:e2e
npm run build
```

## Git Workflow

The project is intended to be delivered with small, reviewable commits:

```text
chore: bootstrap next app
feat: add article rss data layer
feat: build homepage article experience
feat: add article detail pages
feat: implement seo metadata and structured data
test: add unit integration and e2e coverage
docs: add project documentation
```

Recommended feature branches:

```text
feature/homepage
feature/article-pages
feature/seo
feature/tests
feature/docs-polish
```

Each feature can be pushed independently and opened as a pull request into `main`.

## Repository Description

A polished Next.js media website built for the Paris Match technical test, featuring Le Monde RSS articles, SSG/ISR, SEO metadata, structured data, search, category filtering, and automated tests.

## Review Focus

This project is optimized for the evaluation criteria in the technical test:

- Clean, readable TypeScript.
- Clear architectural boundaries.
- SEO-first page metadata and structured data.
- Fast rendering through Next.js SSG/ISR.
- Accessible and responsive editorial UI.
- Meaningful automated tests.
- Step-by-step Git history for review.
