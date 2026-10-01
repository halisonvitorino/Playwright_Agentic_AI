const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/login-page");

test.describe("Login Flow - Happy Path", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToHomePage();
  });

  test("should show error message for valid credentials (demo site limitation)", async ({ page }) => {
    // Fill the login form with valid data
    await loginPage.fillEmail("usuario@teste.com");
    await loginPage.fillPassword("Senha123!");

    // Submit the form
    await loginPage.submitForm();

    // Wait for alert message to appear
    await page.waitForTimeout(2000);

    // Check for the alert message
    const alertMessage = await loginPage.getAlertMessage();
    // The alert message appears to be split into two lines in the UI
    expect(alertMessage).toContain("Usuário ou senha inválido");
    expect(alertMessage).toContain("Tente novamente ou verifique suas informações");

    // Verify we are still on the login page
    const isOnLoginPage = await loginPage.isOnLoginPage();
    expect(isOnLoginPage).toBe(true);
  });
});