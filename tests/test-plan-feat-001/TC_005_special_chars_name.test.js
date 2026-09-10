const { test, expect } = require("@playwright/test");
const { RegistrationPage } = require("../../pages/registration-page");
const { testData } = require("../../utils/test-data");

test.describe("Registration Flow - Special Characters in Name", () => {
  let registrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.navigateToHomePage();
    await registrationPage.clickRegistrar();
  });

  test("should not allow submission when name contains special characters/numbers", async ({
    page,
  }) => {
    // Fill Nome with special characters and numbers
    await registrationPage.fillNome(testData.invalidNames[0]); // João123!
    await registrationPage.fillEmail(testData.validUser.email);
    await registrationPage.fillSenha(testData.validUser.senha);
    await registrationPage.fillConfirmacaoSenha(
      testData.validUser.confirmacaoSenha,
    );

    // Submit the form
    await registrationPage.submitForm();

    // Verify form was not submitted (still on registration page)
    const isOnRegistrationPage = await registrationPage.isOnRegistrationPage();
    expect(isOnRegistrationPage).toBe(true);

    // Optional: Check if there's any validation error (implementation dependent)
    // For now, we just verify submission is prevented
  });
});
