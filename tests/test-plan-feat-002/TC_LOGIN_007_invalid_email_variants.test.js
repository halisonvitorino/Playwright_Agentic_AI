const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/login-page");

test.describe("Login Flow - Invalid Email Variants", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToHomePage();
  });

  // Test for missing domain
  test("should show format error for email missing domain", async ({ page }) => {
    await loginPage.fillEmail("usuario@");
    await loginPage.fillPassword("Senha123!");

    await loginPage.submitForm();

    const emailError = await loginPage.getEmailError();
    expect(emailError).toBe("Formato inválido");

    const senhaError = await loginPage.getSenhaError();
    expect(senhaError).toBe("");

    const isOnLoginPage = await loginPage.isOnLoginPage();
    expect(isOnLoginPage).toBe(true);
  });

  // Test for missing local part
  test("should show format error for email missing local part", async ({ page }) => {
    await loginPage.fillEmail("@dominio.com");
    await loginPage.fillPassword("Senha123!");

    await loginPage.submitForm();

    const emailError = await loginPage.getEmailError();
    expect(emailError).toBe("Formato inválido");

    const senhaError = await loginPage.getSenhaError();
    expect(senhaError).toBe("");

    const isOnLoginPage = await loginPage.isOnLoginPage();
    expect(isOnLoginPage).toBe(true);
  });

  // Test for missing @ symbol
  test("should show format error for email missing @ symbol", async ({ page }) => {
    await loginPage.fillEmail("usuario.dominio");
    await loginPage.fillPassword("Senha123!");

    await loginPage.submitForm();

    const emailError = await loginPage.getEmailError();
    expect(emailError).toBe("Formato inválido");

    const senhaError = await loginPage.getSenhaError();
    expect(senhaError).toBe("");

    const isOnLoginPage = await loginPage.isOnLoginPage();
    expect(isOnLoginPage).toBe(true);
  });

  // Test for missing TLD
  test("should show format error for email missing TLD", async ({ page }) => {
    await loginPage.fillEmail("usuario@dominio");
    await loginPage.fillPassword("Senha123!");

    await loginPage.submitForm();

    const emailError = await loginPage.getEmailError();
    expect(emailError).toBe("Formato inválido");

    const senhaError = await loginPage.getSenhaError();
    expect(senhaError).toBe("");

    const isOnLoginPage = await loginPage.isOnLoginPage();
    expect(isOnLoginPage).toBe(true);
  });

  // Test for double @
  test("should show format error for email with double @", async ({ page }) => {
    await loginPage.fillEmail("usuario@@dominio.com");
    await loginPage.fillPassword("Senha123!");

    await loginPage.submitForm();

    const emailError = await loginPage.getEmailError();
    expect(emailError).toBe("Formato inválido");

    const senhaError = await loginPage.getSenhaError();
    expect(senhaError).toBe("");

    const isOnLoginPage = await loginPage.isOnLoginPage();
    expect(isOnLoginPage).toBe(true);
  });
});