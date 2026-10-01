const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/login-page");

test.describe("Login Flow - Required Fields Validation", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToHomePage();
  });

  test("should show required field errors when all fields are empty", async ({ page }) => {
    // Submit form with all fields empty
    await loginPage.submitForm();

    // Check specific field errors
    const emailError = await loginPage.getEmailError();
    const senhaError = await loginPage.getSenhaError();

    // Email and senha should show required field error
    expect(emailError).toBe("É campo obrigatório");
    expect(senhaError).toBe("É campo obrigatório");

    // Verify form was not submitted (still on login page)
    const isOnLoginPage = await loginPage.isOnLoginPage();
    expect(isOnLoginPage).toBe(true);
  });
});