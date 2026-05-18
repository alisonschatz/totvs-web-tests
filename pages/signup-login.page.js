const { BasePage } = require('./base.page');

class SignupLoginPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.nameInput    = page.locator('[data-qa="signup-name"]');
    this.emailInput   = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
  }

  async fillSignupForm(name, email) {
    await this.waitForVisible(this.nameInput);
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.signupButton.click();
  }
}

module.exports = { SignupLoginPage };
