const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/login-page");

test.describe("Login Flow - Empty Password", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToHomePage();
  });

  test("should show required field error for password when password is empty and email is filled", async ({ page }) => {
    // Fill login form with valid email and empty password
    await loginPage.fillEmail("usuario@teste.com");
    await loginPage.fillPassword("");

    // Submit the form
    await loginPage.submitForm();

    // Check password error
    const senhaError = await loginPage.getSenhaError();
    expect(senhaError).toBe("É campo obrigatório");

    // Email error should be empty
    const emailError = await loginPage.getEmailError();
    expect(emailError).toBe("");

    // Verify still on login page (form not submitted)
    const isOnLoginPage = await loginPage.isOnLoginPage();
    expect(isOnLoginPage).toBe(true);
  });
});