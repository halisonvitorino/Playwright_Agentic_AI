const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/login-page");

test.describe("Login Flow - Password Visibility Toggle", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToHomePage();
  });

  test("should toggle password visibility when clicking eye icon", async ({ page }) => {
    // Fill password field
    await loginPage.fillPassword("Senha123!");

    // Get password input to check its type
    const passwordInput = loginPage.getLoginForm().locator('input[placeholder="Informe sua senha"]');

    // Initially password should be obscured (type="password")
    let inputType = await passwordInput.getAttribute('type');
    expect(inputType).toBe('password');

    // Toggle password visibility using the page object method
    await loginPage.togglePasswordVisibility();

    // Password should now be visible (type="text")
    inputType = await passwordInput.getAttribute('type');
    expect(inputType).toBe('text');

    // Toggle password visibility again
    await loginPage.togglePasswordVisibility();

    // Password should be obscured again (type="password")
    inputType = await passwordInput.getAttribute('type');
    expect(inputType).toBe('password');
  });
});
