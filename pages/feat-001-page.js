const { BasePage } = require("./base-page");
const { APP_URL } = require("../utils/config");

class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);
    this.registerButton = page.getByRole("button", {
      name: "Registrar",
      exact: true,
    });
    this.email = page.getByPlaceholder("Informe seu e-mail").nth(1);
    this.name = page.getByPlaceholder("Informe seu Nome");
    this.password = page.getByPlaceholder("Informe sua senha").nth(1);
    this.confirmation = page.getByPlaceholder("Informe a confirmação da senha");
    this.submitButton = page.getByRole("button", {
      name: "Cadastrar",
      exact: true,
    });
    this.backToLogin = page.getByRole("link", { name: "Voltar ao login" });
    this.successMessage = page.getByText(/A conta .+ foi criada com sucesso/);
  }

  async open() {
    await this.goto(APP_URL);
    await this.registerButton.click();
  }
}

module.exports = { RegistrationPage };
