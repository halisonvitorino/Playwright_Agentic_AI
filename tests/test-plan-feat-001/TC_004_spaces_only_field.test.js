const { test, expect } = require("@playwright/test");
const { RegistrationPage } = require("../../pages/registration-page");
const { testData } = require("../../utils/test-data");

test.describe("Registration Flow - Whitespace Only Fields", () => {
  let registrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.navigateToHomePage();
    await registrationPage.clickRegistrar();
  });

  test("should treat whitespace-only name as empty (no error message shown)", async ({
    page,
  }) => {
    // Fill Nome with spaces only, other fields valid
    await registrationPage.fillNome(testData.emptyFields.espacosNome); // "   "
    await registrationPage.fillEmail(testData.validUser.email);
    await registrationPage.fillSenha(testData.validUser.senha);
    await registrationPage.fillConfirmacaoSenha(
      testData.validUser.confirmacaoSenha,
    );

    // Submit the form
    await registrationPage.submitForm();

    // Check Nome error - based on exploratory testing, field is treated as empty but no error shown
    const nomeError = await registrationPage.getNomeError();
    //allarariaName
    expect(nomeError).toBe(""); // No error message shown for spaces-only name

    // Verify form was not submitted (still on registration page)
    const isOnRegistrationPage = await registrationPage.isOnRegistrationPage();
    expect(isOnRegistrationPage).toBe(true);
  });
});
