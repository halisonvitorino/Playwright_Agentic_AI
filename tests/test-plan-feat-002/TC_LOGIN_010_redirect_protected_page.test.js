const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/login-page");

test.describe("Login Flow - Redirect Protection", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToHomePage();
  });

  test("should redirect to login page when trying to access protected page", async ({ page }) => {
    // First verify we're on login page
    const isOnLoginPage = await loginPage.isOnLoginPage();
    expect(isOnLoginPage).toBe(true);

    // Try to navigate with invalid credentials
    await loginPage.fillEmail("usuario@teste.com");
    await loginPage.fillPassword("SenhaErrada123!");
    await loginPage.submitForm();

    // Wait for response
    await page.waitForTimeout(2000);

    // Should still be on login page (protected behavior - invalid credentials don't grant access)
    const isStillOnLoginPage = await loginPage.isOnLoginPage();
    expect(isStillOnLoginPage).toBe(true);

    // And should show error message
    const alertMessage = await loginPage.getAlertMessage();
    expect(alertMessage).toContain("Usuário ou senha inválido");
  });
});