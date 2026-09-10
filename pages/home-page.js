// Page Object for Home Page (feat-001)
class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Selectors - scoped to registration form when needed
    this.registrarButton = page.locator('button:has-text("Registrar")');
    this.homePageIndicator = page.locator(
      "text=BugBank, text=Home, text=Bem-vindo",
    );
  }

  /** Navigation Methods */
  async navigateToHomePage() {
    await this.page.goto("https://bugbank.netlify.app/");
  }

  async clickRegistrar() {
    await this.registrarButton.click();
    await this.page.waitForTimeout(1000); // Wait for form transition
  }

  async isOnHomePage() {
    const url = this.page.url();
    return (
      (url.includes("bugbank.netlify.app") && !url.includes("register")) ||
      (await this.homePageIndicator.count()) > 0
    );
  }
}

module.exports = { HomePage };
