const { test, expect } = require("@playwright/test");
const { RegistrationPage } = require("../../pages/registration-page");
const { testData } = require("../../utils/test-data");

test.describe("Registration Flow - Invalid Email Validation", () => {
  let registrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.navigateToHomePage();
    await registrationPage.clickRegistrar();
  });

  test("should show email format error for invalid email", async ({ page }) => {
    // Fill form with invalid email
    await registrationPage.fillNome(testData.validUser.nome);
    await registrationPage.fillEmail(testData.invalidEmails[0]); // joao.silvaexample.com (missing @)
    await registrationPage.fillSenha(testData.validUser.senha);
    await registrationPage.fillConfirmacaoSenha(
      testData.validUser.confirmacaoSenha,
    );

    // Submit the form
    await registrationPage.submitForm();

    // Check email error
    const emailError = await registrationPage.getEmailError();
    expect(emailError).toBe("Formato inválido");

    // Verify form was not submitted
    const isOnRegistrationPage = await registrationPage.isOnRegistrationPage();
    expect(isOnRegistrationPage).toBe(true);
  });
});
