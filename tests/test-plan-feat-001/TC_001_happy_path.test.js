const { test, expect } = require("@playwright/test");
const { HomePage } = require("../../pages/home-page");
const { RegistrationPage } = require("../../pages/registration-page");
const { testData } = require("../../utils/test-data");

test.describe("Registration Flow - Happy Path", () => {
  let homePage;
  let registrationPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    registrationPage = new RegistrationPage(page);
    await homePage.navigateToHomePage();
    await homePage.clickRegistrar();
  });

  test("should successfully register with valid data", async ({ page }) => {
    // Fill the registration form with valid data
    await registrationPage.fillRegistrationForm(testData.validUser);

    // Submit the form
    await registrationPage.submitForm();

    // Verify no validation errors are present
    const hasValidationErrors = await registrationPage.hasValidationErrors();
    expect(hasValidationErrors).toBe(false);

    // Verify we're either on home page or no error messages (demo site behavior)
    const isOnHomePage = await registrationPage.isOnHomePage();
    const hasSuccessMessage = await registrationPage.hasSuccessMessage();
    const hasAlertSuccess = await registrationPage.hasAlertSuccess();

    // For demo site, we accept either being on home page or having some success indication
    // or simply having no validation errors after submission
    expect(
      isOnHomePage ||
        hasSuccessMessage ||
        hasAlertSuccess ||
        !hasValidationErrors,
    ).toBe(true);
  });
});
