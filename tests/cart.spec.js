const { test, expect } = require('@playwright/test');
const { HomePage }     = require('../pages/home.page');
const { ProductsPage } = require('../pages/products.page');
const { CartPage }     = require('../pages/cart.page');

function parseCurrency(raw) {
  const match = raw.match(/\d+(?:[.,]\d+)?/);
  if (!match) throw new Error(`Não foi possível extrair valor de: "${raw}"`);
  return parseFloat(match[0].replace(',', '.'));
}

test.describe('Carrinho de compras', () => {
  const QUANTITY = 4;

  test('deve adicionar 4 unidades ao carrinho e validar quantidade e total', async ({ page }) => {
    const homePage     = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage     = new CartPage(page);

    await homePage.open();
    await homePage.goToProducts();
    await productsPage.waitForProducts();
    await productsPage.addFirstProductWithQuantity(QUANTITY);
    await productsPage.viewCart();
    await cartPage.waitForCart();

    const { quantity, unitPrice, total } = await cartPage.getFirstItemSummary();

    expect(quantity).toBe(QUANTITY);
    expect(parseCurrency(total)).toBeCloseTo(parseCurrency(unitPrice) * QUANTITY, 2);
  });
});
