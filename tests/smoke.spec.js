const { test, expect } = require('@playwright/test');

test.describe('The Draft smoke tests', () => {
  test('home page loads with domain badges', async ({ page }) => {
    await page.goto('');
    await expect(page.locator('h1')).toContainText('The Draft');
    await expect(page.locator('.domain-badge').first()).toBeVisible();
  });

  test('domains page lists all four domains', async ({ page }) => {
    await page.goto('domains/');
    await expect(page.locator('h1')).toContainText('Domains');
    await expect(page.locator('.domain-card')).toHaveCount(4);
  });

  test('domain agentic page shows primary articles', async ({ page }) => {
    await page.goto('domains/agentic/');
    await expect(page.locator('h1')).toContainText('Agentic');
    await expect(page.locator('text=Primary artifacts')).toBeVisible();
    await expect(page.locator('a[href*="agentic-guardrails"]')).toBeVisible();
  });

  test('person page with slug loads (Don Norman)', async ({ page }) => {
    await page.goto('people/don-norman/');
    await expect(page.locator('h1')).toContainText('Don Norman');
    await expect(page.locator('.domain-badge--primary')).toContainText('UX');
  });

  test('search page loads with search input', async ({ page }) => {
    await page.goto('search/');
    await expect(page.locator('h1')).toContainText('Search');
    await expect(page.locator('#global-search')).toBeVisible();
  });

  test('search returns results for "guardrails"', async ({ page }) => {
    await page.goto('search/');
    await expect(page.locator('[data-domain-filter]')).toBeVisible({ timeout: 10000 });
    await page.locator('#global-search').fill('guardrails');
    const results = page.locator('[data-results-list] a');
    await expect(results.first()).toBeVisible({ timeout: 5000 });
    const links = await results.allTextContents();
    expect(links.some((t) => t.toLowerCase().includes('guardrail'))).toBeTruthy();
  });

  test('UX article has extended reading with calibration sources', async ({ page }) => {
    await page.goto('articles/ux-principles-for-agentic-ai/');
    await expect(page.locator('h1')).toContainText('UX Principles');
    await expect(page.locator('text=Extended Reading')).toBeVisible();
    await expect(page.locator('a[href*="uxmatters.com"]')).toBeVisible();
  });
});
