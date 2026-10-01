const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/login-page");

test.describe("Login Flow - Empty Email", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToHomePage();
  });

  test("should show required field error for email when email is empty and password is filled", async ({ page }) => {
    // Fill login form with empty email and valid password
    await loginPage.fillEmail("");
    await loginPage.fillPassword("Senha123!");

    // Submit the form
    await loginPage.submitForm();

    // Check email error
    const emailError = await loginPage.getEmailError();
    expect(emailError).toBe("É campo obrigatório");

    // Password error should be empty
    const senhaError = await loginPage.getSenhaError();
    expect(senhaError).toBe("");

    // Verify still on login page (form not submitted)
    const isOnLoginPage = await loginPage.isOnLoginPage();
    expect(isOnLoginPage).toBe(true);
  });
});