const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/login-page");

test.describe("Login Flow - Navigation to Register", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToHomePage();
  });

  test("should show registration form when clicking Registrar button", async ({ page }) => {
    // Click the Registrar button
    await loginPage.clickRegistrar();

    // Wait for registration form to appear
    await page.waitForTimeout(1000);

    // Scope to registration form (form containing Cadastrar button)
    const registrationForm = page.locator('form:has(button:has-text("Cadastrar"))');

    // Verify registration form is displayed
    const nomeInput = registrationForm.locator('input[placeholder="Informe seu Nome"]');
    await expect(nomeInput).toBeVisible();

    const emailInput = registrationForm.locator('input[placeholder="Informe seu e-mail"]');
    await expect(emailInput).toBeVisible();

    const senhaInput = registrationForm.locator('input[placeholder="Informe sua senha"]');
    await expect(senhaInput).toBeVisible();

    const confirmacaoInput = registrationForm.locator('input[placeholder="Informe a confirmação da senha"]');
    await expect(confirmacaoInput).toBeVisible();

    // Verify Voltar ao login link exists (outside the form?)
    const voltarButton = page.locator('a:has-text("Voltar ao login")');
    await expect(voltarButton).toBeVisible();
  });
});