import { expect, test } from "@playwright/test";

test("reader can open an article from the homepage", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "The world in focus" })).toBeVisible();

  const firstArticle = page.getByRole("link", { name: /read/i }).first();
  await firstArticle.click();

  await expect(page).toHaveURL(/\/articles\//);
  await expect(page.getByRole("link", { name: "Back to homepage" })).toBeVisible();
});
