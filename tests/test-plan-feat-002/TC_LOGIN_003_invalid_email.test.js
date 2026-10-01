const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/login-page");

test.describe("Login Flow - Invalid Email Format", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToHomePage();
  });

  test("should show email format error when email is invalid", async ({ page }) => {
    // Fill login form with invalid email (without @) and valid password
    await loginPage.fillEmail("emailinválido");
    await loginPage.fillPassword("Senha123!");

    // Submit the form
    await loginPage.submitForm();

    // Check email error
    const emailError = await loginPage.getEmailError();
    expect(emailError).toBe("Formato inválido");

    // Password error should be empty
    const senhaError = await loginPage.getSenhaError();
    expect(senhaError).toBe("");

    // Verify still on login page (form not submitted)
    const isOnLoginPage = await loginPage.isOnLoginPage();
    expect(isOnLoginPage).toBe(true);
  });
});