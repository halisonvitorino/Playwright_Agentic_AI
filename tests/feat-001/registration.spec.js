const { test, expect } = require("@playwright/test");
const { RegistrationPage } = require("../../pages/feat-001-page");
const { createRegistrationData } = require("../../utils/test-data");
const {
  fillRegistrationForm,
  submitRegistration,
} = require("../../utils/actions");
const {
  expectRegistrationForm,
  expectRegistrationSuccess,
} = require("../../utils/assertions");

test.describe("Feature: New User Registration", () => {
  let registrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.open();
    await expectRegistrationForm(registrationPage);
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({
        path: testInfo.outputPath("failure.png"),
        fullPage: true,
      });
    }
  });

  test("Scenario 1 - Registration succeeds with valid data", async () => {
    const data = createRegistrationData();
    await fillRegistrationForm(registrationPage, data);
    await submitRegistration(registrationPage);

    await expectRegistrationSuccess(registrationPage);
    await expect(registrationPage.successMessage).toHaveCount(1);
  });

  test("Scenario 2 - Required fields left blank show validation", async () => {
    await submitRegistration(registrationPage);

    await expect(
      registrationPage.page.getByText("É campo obrigatório"),
    ).toHaveCount(4);
    await expect(registrationPage.name).toBeEmpty();
    await expect(registrationPage.successMessage).toHaveCount(0);
  });

  test("Scenario 3 - Invalid email format is rejected", async () => {
    const data = createRegistrationData({
      email: "qa.feat001.invalid.example.com",
    });
    await fillRegistrationForm(registrationPage, data);
    await submitRegistration(registrationPage);

    await expect(
      registrationPage.page.getByText("Formato inválido"),
    ).toBeVisible();
    await expect(registrationPage.successMessage).toHaveCount(0);
  });

  test("Scenario 4 - Whitespace-only name is rejected", async () => {
    const data = createRegistrationData({ name: "   " });
    await fillRegistrationForm(registrationPage, data);
    await submitRegistration(registrationPage);

    await expect(
      registrationPage.page.getByText("The Name field is required"),
    ).toBeVisible();
    await expect(registrationPage.successMessage).toHaveCount(0);
  });

  test("Scenario 5 - Name with special characters or numbers is rejected", async () => {
    const data = createRegistrationData({ name: "João123!" });
    await fillRegistrationForm(registrationPage, data);
    await submitRegistration(registrationPage);

    await expect(registrationPage.successMessage).toHaveCount(0);
  });

  test("Scenario 6 - Name over the maximum length is rejected", async () => {
    const data = createRegistrationData({ name: "A".repeat(300) });
    await fillRegistrationForm(registrationPage, data);
    await expect(registrationPage.name).toHaveValue("A".repeat(300));
    await submitRegistration(registrationPage);

    await expect(registrationPage.successMessage).toHaveCount(0);
  });
});
