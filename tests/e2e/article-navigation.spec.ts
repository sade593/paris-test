import { expect, test } from "@playwright/test";

test("reader can open an article from the homepage", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: "Paris Match homepage" })).toBeVisible();

  const firstArticle = page.getByRole("link", { name: /read article/i }).first();
  await firstArticle.click();

  await expect(page).toHaveURL(/\/articles\//);
  await expect(page.getByRole("link", { name: "Back to homepage" })).toBeVisible();
});
