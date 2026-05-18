const { test, expect } = require('@playwright/test');

test.describe('API — lista de produtos', () => {
  test('deve retornar status 200 e uma lista de produtos válida', async ({ request }) => {
    const response = await request.get('https://automationexercise.com/api/productsList');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('responseCode', 200);

    const { products } = body;
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);

    for (const product of products) {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('brand');
      expect(product).toHaveProperty('category');
      expect(product.category).toHaveProperty('usertype');
      expect(product.category).toHaveProperty('category');
    }
  });
});
