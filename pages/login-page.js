// Page Object for Login Page (feat-002)
class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Selectors - scoped to login form when needed
    this.acessarButton = page.locator('button:has-text("Acessar")');
    this.registrarButton = page.locator('button:has-text("Registrar")');
    this.errorMessages = page.locator("p.input__warging");
    // Alert message that appears after login attempt (success or error)
    this.alertMessage = page.locator('text=Usuário ou senha inválido. Tente novamente ou verifique suas informações!');
    // Success message (if any)
    this.successMessage = page.locator(
      "text=Cadastro realizado com sucesso, text=Sucesso, text=success, text=Bem-vindo"
    );
  }

  /** Get login form scoped inputs */
  getLoginForm() {
    // Return the form that contains the Acessar button (login form)
    return this.page.locator('form:has(button:has-text("Acessar"))');
  }

  /** Navigation Methods */
  async navigateToHomePage() {
    await this.page.goto("https://bugbank.netlify.app/");
  }

  async clickRegistrar() {
    await this.registrarButton.click();
    await this.page.waitForTimeout(1000); // Wait for form transition
  }

  /** Form Filling Methods - Login Form Scoped */
  async fillEmail(email) {
    const loginForm = this.getLoginForm();
    await loginForm
      .locator('input[placeholder="Informe seu e-mail"]')
      .fill(email);
  }

  async fillPassword(senha) {
    const loginForm = this.getLoginForm();
    await loginForm
      .locator('input[placeholder="Informe sua senha"]')
      .fill(senha);
  }

  async fillLoginForm(data) {
    await this.fillEmail(data.email);
    await this.fillPassword(data.senha);
  }

  /** Toggle password visibility */
  async togglePasswordVisibility() {
    const eyeIcon = this.getLoginForm().locator('button.login__eye');
    // Wait for the eye icon to be visible
    await eyeIcon.waitFor({ state: 'visible', timeout: 10000 });
    await eyeIcon.click();
  }

  /** Form Submission */
  async submitForm() {
    const loginForm = this.getLoginForm();
    await loginForm.locator('button:has-text("Acessar")').click();
    await this.page.waitForTimeout(2000); // Wait for submission processing
  }

  /** Validation Methods */
  async getErrorMessageForField(fieldPlaceholder) {
    const loginForm = this.getLoginForm();
    const fieldInput = loginForm.locator(
      `input[placeholder="${fieldPlaceholder}"]`,
    );
    const parentDiv = fieldInput.locator("xpath=..");
    const errorElements = parentDiv.locator("p.input__warging");

    const count = await errorElements.count();
    for (let i = 0; i < count; i++) {
      const text = await errorElements.nth(i).textContent();
      if (text.trim() !== "") {
        return text.trim();
      }
    }
    return "";
  }

  async getEmailError() {
    return await this.getErrorMessageForField("Informe seu e-mail");
  }

  async getSenhaError() {
    return await this.getErrorMessageForField("Informe sua senha");
  }

  /** Alert and Success Methods */
  async getAlertMessage() {
    if (await this.alertMessage.count() > 0) {
      return await this.alertMessage.textContent();
    }
    return null;
  }

  /** Verification Methods */
  async isOnLoginPage() {
    return this.page.url().includes("bugbank.netlify.app") &&
           (await this.getLoginForm()
             .locator('input[placeholder="Informe seu e-mail"]')
             .count()) > 0;
  }

  async hasValidationErrors() {
    const errorCount = await this.errorMessages.count();
    if (errorCount === 0) return false;

    for (let i = 0; i < errorCount; i++) {
      const text = await this.errorMessages.nth(i).textContent();
      if (text.trim() !== "" && text.trim() !== "É campo obrigatório") {
        return true;
      }
    }
    return false;
  }

  async clearForm() {
    const loginForm = this.getLoginForm();
    await loginForm
      .locator('input[placeholder="Informe seu e-mail"]')
      .fill("");
    await loginForm
      .locator('input[placeholder="Informe sua senha"]')
      .fill("");
  }
}

module.exports = { LoginPage };