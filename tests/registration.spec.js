const { test, expect } = require('@playwright/test');
const { HomePage }        = require('../pages/home.page');
const { SignupLoginPage } = require('../pages/signup-login.page');
const { RegisterPage }    = require('../pages/register.page');
const { buildUser }       = require('../support/user.factory');

test.describe('Registro de novo usuário', () => {
  test('deve criar conta com sucesso e exibir "ACCOUNT CREATED!"', async ({ page }) => {
    const user = buildUser();

    const homePage        = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);
    const registerPage    = new RegisterPage(page);

    await homePage.open();
    await homePage.goToSignupLogin();
    await signupLoginPage.fillSignupForm(user.name, user.email);
    await registerPage.fillAndSubmit(user);

    const confirmation = await registerPage.accountCreatedIsVisible();
    await expect(confirmation).toHaveText(/account created!/i);
  });
});
