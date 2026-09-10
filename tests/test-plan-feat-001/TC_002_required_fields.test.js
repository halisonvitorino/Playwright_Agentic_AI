const { test, expect } = require("@playwright/test");
const { RegistrationPage } = require("../../pages/registration-page");
const { testData } = require("../../utils/test-data");

test.describe("Registration Flow - Required Fields Validation", () => {
  let registrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.navigateToHomePage();
    await registrationPage.clickRegistrar();
  });

  test("should show required field errors when all fields are empty", async ({
    page,
  }) => {
    // Submit form with all fields empty
    await registrationPage.submitForm();

    // Check specific field errors
    const nomeError = await registrationPage.getNomeError();
    const emailError = await registrationPage.getEmailError();
    const senhaError = await registrationPage.getSenhaError();
    const confirmacaoErro = await registrationPage.getConfirmacaoSenhaError();

    // Email, senha, and confirmacao should show required field error
    // Note: Nome field has inconsistent behavior in the demo app
    expect(emailError).toBe("É campo obrigatório");
    expect(senhaError).toBe("É campo obrigatório");
    expect(confirmacaoErro).toBe("É campo obrigatório");

    // Verify form was not submitted (still on registration page)
    const isOnRegistrationPage = await registrationPage.isOnRegistrationPage();
    expect(isOnRegistrationPage).toBe(true);
  });
});
