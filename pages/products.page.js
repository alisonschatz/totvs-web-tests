const { BasePage } = require('./base.page');

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.productCards = page.locator('.productinfo');
  }

  async waitForProducts() {
    await this.waitForVisible(this.productCards.first());
  }

  async addFirstProductWithQuantity(quantity) {
    await this.dismissAdIfPresent();

    const viewLink = this.page.locator('.choose > .nav > li > a').first();
    await this.waitForVisible(viewLink);
    await viewLink.click();

    await this.page.waitForLoadState('domcontentloaded');
    await this.dismissAdIfPresent();
    await this.dismissAdIfPresent();

    const qtyInput  = this.page.locator('#quantity');
    const addToCart = this.page.getByRole('button', { name: /add to cart/i });

    await this.waitForVisible(qtyInput);
    await qtyInput.selectText();
    await qtyInput.fill(String(quantity));

    await this.waitForVisible(addToCart);  
    await addToCart.scrollIntoViewIfNeeded();
    await addToCart.click({ force: true });

    const modal = this.page.locator('#cartModal');
    await this.waitForVisible(modal);
  }

  async viewCart() {
    await this.page.getByRole('link', { name: /view cart/i }).click();
  }
}

module.exports = { ProductsPage };