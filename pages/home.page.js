const { BasePage } = require('./base.page');

class HomePage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.signupLoginLink = page.locator('a[href="/login"]');
    this.productsLink    = page.locator('a[href="/products"]');
    this.cartLink        = page.locator('a[href="/view_cart"]').first();
  }

  async open() {
    await this.navigate('/');
    await this.waitForVisible(this.signupLoginLink);
    await this.dismissAdIfPresent();
  }

  async goToSignupLogin() {
    await this.signupLoginLink.click();
  }

  async goToProducts() {
    await this.dismissAdIfPresent();
    await this.productsLink.click();
  }

  async goToCart() {
    await this.dismissAdIfPresent();
    await this.cartLink.click();
  }
}

module.exports = { HomePage };
