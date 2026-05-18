const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 45_000,
  expect: { timeout: 8_000 },
  fullyParallel: false,
  retries: 1,
  reporter: [
    ['./support/reporter.js'],
    ['html', { open: 'never' }],
  ],

  use: {
    baseURL: 'https://automationexercise.com',
    headless: true,
    viewport: { width: 1280, height: 720 },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
