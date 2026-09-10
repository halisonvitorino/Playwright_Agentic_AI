const { test, expect } = require("@playwright/test");
const { RegistrationPage } = require("../../pages/registration-page");
const { testData } = require("../../utils/test-data");

test.describe("Registration Flow - Password Mismatch Validation", () => {
  let registrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.navigateToHomePage();
    await registrationPage.clickRegistrar();
  });

  test("should not allow submission when passwords do not match", async ({
    page,
  }) => {
    // Fill form with mismatched passwords
    await registrationPage.fillNome(testData.validUser.nome);
    await registrationPage.fillEmail(testData.validUser.email);
    await registrationPage.fillSenha(testData.passwordMismatch[0].senha); // Senha123!
    await registrationPage.fillConfirmacaoSenha(
      testData.passwordMismatch[0].confirmacao,
    ); // Senha456!

    // Submit the form
    await registrationPage.submitForm();

    // Verify form was not submitted (still on registration page)
    const isOnRegistrationPage = await registrationPage.isOnRegistrationPage();
    expect(isOnRegistrationPage).toBe(true);

    // Optional: Check if there's any validation error (implementation dependent)
    // For now, we just verify submission is prevented
  });
});
