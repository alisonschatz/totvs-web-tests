class BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
  }

  async navigate(path = '/') {
    await this.page.goto(path);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async waitForVisible(locator) {
    await locator.waitFor({ state: 'visible' });
  }

  async dismissAdIfPresent() {
    try {
      const closeBtn = this.page
        .frameLocator('iframe[id^="aswift"]')
        .first()
        .locator('#dismiss-button, #close-icon')
        .first();
      await closeBtn.click({ timeout: 2_000 });
      return;
    } catch {
      // no iframe ad
    }

    try {
      const overlay = this.page.locator('div[style*="z-index: 99"]').first();
      if (await overlay.isVisible({ timeout: 1_000 })) {
        await overlay.evaluate(el => el.remove());
      }
    } catch {
      // no overlay
    }
  }
}

module.exports = { BasePage };
