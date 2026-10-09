async function fillRegistrationForm(registrationPage, data) {
  await registrationPage.email.fill(data.email);
  await registrationPage.name.fill(data.name);
  await registrationPage.password.fill(data.password);
  await registrationPage.confirmation.fill(data.confirmation);
}

async function submitRegistration(registrationPage) {
  await registrationPage.submitButton.click();
}

module.exports = { fillRegistrationForm, submitRegistration };
