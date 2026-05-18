const { BasePage } = require('./base.page');

class RegisterPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.titleMrRadio     = page.locator('#id_gender1');
    this.passwordInput    = page.locator('[data-qa="password"]');
    this.dobDaySelect     = page.locator('[data-qa="days"]');
    this.dobMonthSelect   = page.locator('[data-qa="months"]');
    this.dobYearSelect    = page.locator('[data-qa="years"]');
    this.firstNameInput   = page.locator('[data-qa="first_name"]');
    this.lastNameInput    = page.locator('[data-qa="last_name"]');
    this.companyInput     = page.locator('[data-qa="company"]');
    this.addressInput     = page.locator('[data-qa="address"]');
    this.countrySelect    = page.locator('[data-qa="country"]');
    this.stateInput       = page.locator('[data-qa="state"]');
    this.cityInput        = page.locator('[data-qa="city"]');
    this.zipcodeInput     = page.locator('[data-qa="zipcode"]');
    this.mobileInput      = page.locator('[data-qa="mobile_number"]');
    this.createAccountBtn = page.locator('[data-qa="create-account"]');
    this.accountCreatedMsg = page.locator('[data-qa="account-created"]');
    this.continueBtn      = page.locator('[data-qa="continue-button"]');
  }

  async fillAndSubmit(user) {
    await this.waitForVisible(this.titleMrRadio);

    await this.titleMrRadio.check();
    await this.passwordInput.fill(user.password);
    await this.dobDaySelect.selectOption('10');
    await this.dobMonthSelect.selectOption('6');
    await this.dobYearSelect.selectOption('1995');
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.companyInput.fill(user.company);
    await this.addressInput.fill(user.address);
    await this.countrySelect.selectOption(user.country);
    await this.stateInput.fill(user.state);
    await this.cityInput.fill(user.city);
    await this.zipcodeInput.fill(user.zipcode);
    await this.mobileInput.fill(user.phone);
    await this.createAccountBtn.click();
  }

  async accountCreatedIsVisible() {
    await this.waitForVisible(this.accountCreatedMsg);
    return this.accountCreatedMsg;
  }

  async continue() {
    await this.continueBtn.click();
  }
}

module.exports = { RegisterPage };
