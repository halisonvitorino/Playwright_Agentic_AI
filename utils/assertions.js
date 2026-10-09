const { expect } = require("@playwright/test");

async function expectRegistrationForm(registrationPage) {
  await expect(registrationPage.email).toBeVisible();
  await expect(registrationPage.name).toBeVisible();
  await expect(registrationPage.password).toBeVisible();
  await expect(registrationPage.confirmation).toBeVisible();
  await expect(registrationPage.submitButton).toBeEnabled();
}

async function expectRegistrationSuccess(registrationPage) {
  await expect(registrationPage.successMessage).toBeVisible();
}

module.exports = { expectRegistrationForm, expectRegistrationSuccess };
