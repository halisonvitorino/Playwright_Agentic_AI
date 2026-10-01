const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/login-page");

test.describe("Login Flow - Wrong Password", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToHomePage();
  });

  test("should show error message for incorrect password", async ({ page }) => {
    // Fill login form with valid email and incorrect password
    await loginPage.fillEmail("usuario@teste.com");
    await loginPage.fillPassword("SenhaErrada456!");

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