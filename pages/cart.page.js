const { BasePage } = require('./base.page');

class CartPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.cartRows = page.locator('tbody tr');
  }

  async waitForCart() {
    await this.waitForVisible(this.cartRows.first());
  }

  async getFirstItemSummary() {
    const row       = this.cartRows.first();
    const quantity  = await row.locator('.cart_quantity button').innerText();
    const unitPrice = await row.locator('.cart_price p').innerText();
    const total     = await row.locator('.cart_total_price').innerText();

    return {
      quantity:  parseInt(quantity.trim(), 10),
      unitPrice: unitPrice.trim(),
      total:     total.trim(),
    };
  }
}

module.exports = { CartPage };
