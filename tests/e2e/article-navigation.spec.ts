import { expect, test } from "@playwright/test";

test("reader can open an article from the homepage", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: "Paris Match homepage" })).toBeVisible();

  const firstArticle = page.getByRole("link", { name: /read article/i }).first();
  await firstArticle.click();

  await expect(page).toHaveURL(/\/articles\//);
  await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Accueil" })).toBeVisible();
});

test("top navigation filters the article section by topic", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Politics", exact: true }).click();

  await expect(page).toHaveURL(/topic=politics/);
  await expect(page.getByPlaceholder("Category: Politics")).toBeVisible();
  await expect(page.getByText("No articles match the selected filters.")).toHaveCount(0);
});
