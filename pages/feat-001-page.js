// Page Object for Registration Page (feat-001)
class RegistrationPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Selectors - scoped to registration form when needed
    this.registrarButton = page.locator('button:has-text("Registrar")');
    this.cadastrarButton = page.locator('button:has-text("Cadastrar")');
    this.errorMessages = page.locator('p.input__warging');
    this.successMessage = page.locator('text=Cadastro realizado com sucesso, text=Sucesso, text=success');
    this.homePageIndicator = page.locator('text=BugBank, text=Home, text=Bem-vindo');
    this.alertSuccess = page.locator('.alert-success, .success, [class*="success"]');
  }

  /** Get registration form scoped inputs */
  getRegistrationForm() {
    // Return the form that contains the Cadastrar button (registration form)
    return this.page.locator('form:has(button:has-text("Cadastrar"))');
  }

  /** Get login form scoped inputs */
  getLoginForm() {
    // Return the form that contains the Acessar button (login form)
    return this.page.locator('form:has(button:has-text("Acessar"))');
  }

  /** Navigation Methods */
  async navigateToHomePage() {
    await this.page.goto('https://bugbank.netlify.app/');
  }

  async clickRegistrar() {
    await this.registrarButton.click();
    await this.page.waitForTimeout(1000); // Wait for form transition
  }

  /** Form Filling Methods - Registration Form Scoped */
  async fillNome(nome) {
    const registrationForm = this.getRegistrationForm();
    await registrationForm.locator('input[placeholder="Informe seu Nome"]').fill(nome);
  }

  async fillEmail(email) {
    const registrationForm = this.getRegistrationForm();
    await registrationForm.locator('input[placeholder="Informe seu e-mail"]').fill(email);
  }

  async fillSenha(senha) {
    const registrationForm = this.getRegistrationForm();
    await registrationForm.locator('input[placeholder="Informe sua senha"]').fill(senha);
  }

  async fillConfirmacaoSenha(confirmacaoSenha) {
    const registrationForm = this.getRegistrationForm();
    await registrationForm.locator('input[placeholder="Informe a confirmação da senha"]').fill(confirmacaoSenha);
  }

  async fillTelefone(telefone) {
    const registrationForm = this.getRegistrationForm();
    const telefoneInput = registrationForm.locator('input[placeholder*="Telefone" i]');
    if (await telefoneInput.count() > 0) {
      await telefoneInput.fill(telefone);
    }
  }

  async fillDataNascimento(dataNascimento) {
    const registrationForm = this.getRegistrationForm();
    const dataNascimentoInput = registrationForm.locator('input[placeholder*="Data de Nascimento" i]');
    if (await dataNascimentoInput.count() > 0) {
      await dataNascimentoInput.fill(dataNascimento);
    }
  }

  async fillCPF(cpf) {
    const registrationForm = this.getRegistrationForm();
    const cpfInput = registrationForm.locator('input[placeholder*="CPF" i]');
    if (await cpfInput.count() > 0) {
      await cpfInput.fill(cpf);
    }
  }

  async fillRegistrationForm(data) {
    await this.fillNome(data.nome);
    await this.fillEmail(data.email);
    await this.fillSenha(data.senha);
    await this.fillConfirmacaoSenha(data.confirmacaoSenha);
    await this.fillTelefone(data.telefone);
    await this.fillDataNascimento(data.dataNascimento);
    await this.fillCPF(data.cpf);
  }

  /** Form Submission */
  async submitForm() {
    const registrationForm = this.getRegistrationForm();
    await registrationForm.locator('button:has-text("Cadastrar")').click();
    await this.page.waitForTimeout(2000); // Wait for submission processing
  }

  /** Validation Methods */
  async getErrorMessageForField(fieldPlaceholder) {
    const registrationForm = this.getRegistrationForm();
    const fieldInput = registrationForm.locator(`input[placeholder="${fieldPlaceholder}"]`);
    const parentDiv = fieldInput.locator('xpath=..');
    const errorElements = parentDiv.locator('p.input__warging');

    const count = await errorElements.count();
    for (let i = 0; i < count; i++) {
      const text = await errorElements.nth(i).textContent();
      if (text.trim() !== '') {
        return text.trim();
      }
    }
    return '';
  }

  async getNomeError() {
    return await this.getErrorMessageForField('Informe seu Nome');
  }

  async getEmailError() {
    return await this.getErrorMessageForField('Informe seu e-mail');
  }

  async getSenhaError() {
    return await this.getErrorMessageForField('Informe sua senha');
  }

  async getConfirmacaoSenhaError() {
    return await this.getErrorMessageForField('Informe a confirmação da senha');
  }

  /** Verification Methods */
  async isOnRegistrationPage() {
    return await this.page.url().includes('register') ||
           (await this.getRegistrationForm().locator('input[placeholder="Informe seu Nome"]').count() > 0);
  }

  async isOnHomePage() {
    const url = this.page.url();
    return url.includes('bugbank.netlify.app') && !url.includes('register') ||
           await this.homePageIndicator.count() > 0;
  }

  async hasSuccessMessage() {
    return await this.successMessage.count() > 0 &&
           (await this.successMessage.textContent()).trim() !== '';
  }

  async hasAlertSuccess() {
    return await this.alertSuccess.count() > 0 &&
           (await this.alertSuccess.textContent()).trim() !== '';
  }

  async hasValidationErrors() {
    const errorCount = await this.errorMessages.count();
    if (errorCount === 0) return false;

    for (let i = 0; i < errorCount; i++) {
      const text = await this.errorMessages.nth(i).textContent();
      if (text.trim() !== '' && text.trim() !== 'É campo obrigatório') {
        return true;
      }
    }
    return false;
  }

  async clearForm() {
    const registrationForm = this.getRegistrationForm();
    await registrationForm.locator('input[placeholder="Informe seu Nome"]').fill('');
    await registrationForm.locator('input[placeholder="Informe seu e-mail"]').fill('');
    await registrationForm.locator('input[placeholder="Informe sua senha"]').fill('');
    await registrationForm.locator('input[placeholder="Informe a confirmação da senha"]').fill('');
  }
}

module.exports = { RegistrationPage };