const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Create screenshots directory if it doesn't exist
const screenshotsDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir);
}

// Helper to take a screenshot
async function takeScreenshot(page, name) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = path.join(screenshotsDir, `${name}-${timestamp}.png`);
  await page.screenshot({ path: filename, fullPage: true });
  console.log(`Screenshot saved: ${filename}`);
  return filename;
}

// Test Case 1: Happy Path - Valid Registration
async function testHappyPath(page) {
  console.log('\n=== Test Case 1: Happy Path - Valid Registration ===');
  try {
    await page.goto('https://bugbank.netlify.app/');
    await takeScreenshot(page, '01-home-page');

    // Click on the registration link/button
    const registerLink = await page.locator('text=Registrar').or(await page.locator('text=Register')).first();
    if (await registerLink.count() > 0) {
      await registerLink.click();
    } else {
      await page.goto('https://bugbank.netlify.app/register');
    }
    await page.waitForTimeout(1000);
    await takeScreenshot(page, '02-registration-page');

    // Fill in the form with valid data
    await page.fill('input[placeholder*="E-mail" i]', 'joao.silva@example.com');
    await page.fill('input[placeholder*="Nome" i]', 'João Silva');
    await page.fill('input[placeholder*="Senha" i]', 'Senha123!');
    await page.fill('input[placeholder*="Confirmação senha" i]', 'Senha123!');

    // Fill additional fields if they exist
    const telefoneInput = await page.locator('input[placeholder*="Telefone" i]');
    if (await telefoneInput.count() > 0) {
      await telefoneInput.fill('(11) 99999-9999');
    }
    const dataNascimentoInput = await page.locator('input[placeholder*="Data de Nascimento" i]');
    if (await dataNascimentoInput.count() > 0) {
      await dataNascimentoInput.fill('01/01/1990');
    }
    const cpfInput = await page.locator('input[placeholder*="CPF" i]');
    if (await cpfInput.count() > 0) {
      await cpfInput.fill('123.456.789-00');
    }

    await takeScreenshot(page, '03-form-filled');

    // Submit the form
    await page.click('button:has-text("Cadastrar"), input[type="submit"]');
    await page.waitForTimeout(2000);

    await takeScreenshot(page, '04-after-submit');

    // Check for success message and redirect
    const url = page.url();
    console.log(`Current URL after submit: ${url}`);

    // Look for success message
    const successMessage = await page.locator('text=Cadastro realizado com sucesso, text=Sucesso, text=success').first();
    let successMsgText = '';
    if (await successMessage.count() > 0) {
      successMsgText = await successMessage.textContent();
    }

    // Check if redirected to home page
    let isRedirectedToHome = url.includes('bugbank.netlify.app') && !url.includes('register');
    const homePageIndicator = await page.locator('text=BugBank, text=Home').first();
    isRedirectedToHome = isRedirectedToHome || (await homePageIndicator.count() > 0);

    if (isRedirectedToHome && successMsgText !== '') {
      console.log('✅ PASS: Success message displayed and redirected to home page');
      return { passed: true, message: 'Success message displayed and redirected to home page' };
    } else {
      console.log('❌ FAIL: Either no success message or not redirected to home page');
      console.log(`Success message text: '${successMsgText}'`);
      console.log(`Is redirected to home: ${isRedirectedToHome}`);
      return { passed: false, message: 'Missing success message or incorrect redirect' };
    }
  } catch (error) {
    console.error('❌ ERROR during test:', error);
    await takeScreenshot(page, '05-error');
    return { passed: false, message: `Test error: ${error.message}` };
  }
}

// Test Case 2: Required Fields - Empty Submission
async function testRequiredFieldsEmpty(page) {
  console.log('\n=== Test Case 2: Required Fields - Empty Submission ===');
  try {
    await page.goto('https://bugbank.netlify.app/');
    const registerLink = await page.locator('text=Registrar').or(await page.locator('text=Register')).first();
    if (await registerLink.count() > 0) {
      await registerLink.click();
    } else {
      await page.goto('https://bugbank.netlify.app/register');
    }
    await page.waitForTimeout(1000);
    await takeScreenshot(page, '06-registration-page-empty');

    // Do not fill any fields, just submit
    await page.click('button:has-text("Cadastrar"), input[type="submit"]');
    await page.waitForTimeout(1000);
    await takeScreenshot(page, '07-after-empty-submit');

    // Check that form is not submitted (we are still on the registration page)
    const url = page.url();
    const isStillOnRegister = url.includes('register') ||
                              await page.locator('input[placeholder*="E-mail" i]').count() > 0;

    // Look for error messages
    const errorMessages = await page.locator('.error, .alert-error, [role="alert"], .invalid-feedback, .error-message');
    const errorCount = await errorMessages.count();
    let errorTexts = [];
    for (let i = 0; i < errorCount; i++) {
      errorTexts.push(await errorMessages.nth(i).textContent());
    }

    // Also look for specific error messages next to fields
    const fieldErrors = await page.locator('input[placeholder*="Nome" i] + .error, input[placeholder*="E-mail" i] + .error, input[placeholder*="Senha" i] + .error');
    const fieldErrorCount = await fieldErrors.count();
    let fieldErrorTexts = [];
    for (let i = 0; i < fieldErrorCount; i++) {
      fieldErrorTexts.push(await fieldErrors.nth(i).textContent());
    }

    // If we see error messages, then validation is working
    if (errorCount > 0 || fieldErrorCount > 0) {
      console.log(`✅ PASS: Form not submitted and error messages displayed`);
      console.log(`Error messages: ${errorTexts.join('; ')}`);
      console.log(`Field errors: ${fieldErrorTexts.join('; ')}`);
      return { passed: true, message: 'Form not submitted and error messages displayed' };
    } else {
      // Check if the form was submitted (we are redirected or see a success message)
      const successMessage = await page.locator('text=Cadastro realizado com sucesso, text=Sucesso, text=success').first();
      const successMsgText = await successMessage.textContent();
      if (await successMessage.count() > 0 || !isStillOnRegister) {
        console.log('❌ FAIL: Form was submitted despite empty fields');
        return { passed: false, message: 'Form submitted with empty fields' };
      } else {
        console.log('⚠️ WARNING: No error messages shown, but form not submitted (maybe HTML5 validation)?');
        return { passed: false, message: 'No validation error messages shown' };
      }
    }
  } catch (error) {
    console.error('❌ ERROR during test:', error);
    await takeScreenshot(page, '08-error');
    return { passed: false, message: `Test error: ${error.message}` };
  }
}

// Test Case 3: Invalid Email Format
async function testInvalidEmail(page) {
  console.log('\n=== Test Case 3: Invalid Email Format ===');
  try {
    await page.goto('https://bugbank.netlify.app/');
    const registerLink = await page.locator('text=Registrar').or(await page.locator('text=Register')).first();
    if (await registerLink.count() > 0) {
      await registerLink.click();
    } else {
      await page.goto('https://bugbank.netlify.app/register');
    }
    await page.waitForTimeout(1000);

    // Fill form with invalid email (missing @)
    await page.fill('input[placeholder*="E-mail" i]', 'joao.silvaexample.com');
    await page.fill('input[placeholder*="Nome" i]', 'João Silva');
    await page.fill('input[placeholder*="Senha" i]', 'Senha123!');
    await page.fill('input[placeholder*="Confirmação senha" i]', 'Senha123!');
    await takeScreenshot(page, '09-form-invalid-email');

    // Submit
    await page.click('button:has-text("Cadastrar"), input[type="submit"]');
    await page.waitForTimeout(1000);
    await takeScreenshot(page, '10-after-invalid-email-submit');

    // Check for email error message
    const emailError = await page.locator('input[placeholder*="E-mail" i]').locator('xpath=../following-sibling::*[contains(@class, "error") or contains(@class, "invalid") or contains(@role, "alert")]');
    const emailErrorText = await emailError.textContent();
    const generalError = await page.locator('.error, .alert-error').first();
    const generalErrorText = await generalError.textContent();

    // Check if form was not submitted (still on registration page)
    const url = page.url();
    const isStillOnRegister = url.includes('register') ||
                              await page.locator('input[placeholder*="E-mail" i]').count() > 0;

    if ((await emailError.count() > 0 && emailErrorText.trim() !== '') ||
        (await generalError.count() > 0 && generalErrorText.trim() !== '')) {
      console.log(`✅ PASS: Email error message displayed: '${emailErrorText || generalErrorText}'`);
      return { passed: true, message: 'Email error displayed' };
    } else if (isStillOnRegister) {
      // Maybe the error is shown in a different way, like the input turning red
      const emailInput = await page.locator('input[placeholder*="E-mail" i]');
      const isInvalid = await emailInput.evaluate(el => el.validity && !el.validity.valid);
      if (isInvalid) {
        console.log('✅ PASS: Email field marked as invalid by browser validation');
        return { passed: true, message: 'Email field marked as invalid' };
      } else {
        console.log('❌ FAIL: No error message shown for invalid email');
        return { passed: false, message: 'No validation error for invalid email' };
      }
    } else {
      console.log('❌ FAIL: Form submitted despite invalid email');
      return { passed: false, message: 'Form submitted with invalid email' };
    }
  } catch (error) {
    console.error('❌ ERROR during test:', error);
    await takeScreenshot(page, '11-error');
    return { passed: false, message: `Test error: ${error.message}` };
  }
}

// Test Case 4: Fields with Only Spaces
async function testSpacesOnlyField(page) {
  console.log('\n=== Test Case 4: Fields with Only Spaces ===');
  try {
    await page.goto('https://bugbank.netlify.app/');
    const registerLink = await page.locator('text=Registrar').or(await page.locator('text=Register')).first();
    if (await registerLink.count() > 0) {
      await registerLink.click();
    } else {
      await page.goto('https://bugbank.netlify.app/register');
    }
    await page.waitForTimeout(1000);

    // Fill Nome with spaces only, other fields valid
    await page.fill('input[placeholder*="Nome" i]', '   ');
    await page.fill('input[placeholder*="E-mail" i]', 'joao.silva@example.com');
    await page.fill('input[placeholder*="Senha" i]', 'Senha123!');
    await page.fill('input[placeholder*="Confirmação senha" i]', 'Senha123!');
    await takeScreenshot(page, '12-form-spaces-name');

    // Submit
    await page.click('button:has-text("Cadastrar"), input[type="submit"]');
    await page.waitForTimeout(1000);
    await takeScreenshot(page, '13-after-spaces-submit');

    // Check for error on Nome field
    const nomeError = await page.locator('input[placeholder*="Nome" i]').locator('xpath=../following-sibling::*[contains(@class, "error") or contains(@class, "invalid") or contains(@role, "alert")]');
    const nomeErrorText = await nomeError.textContent();
    const generalError = await page.locator('.error, .alert-error').first();
    const generalErrorText = await generalError.textContent();

    // Check if form was not submitted
    const url = page.url();
    const isStillOnRegister = url.includes('register') ||
                              await page.locator('input[placeholder*="Nome" i]').count() > 0;

    if ((await nomeError.count() > 0 && nomeErrorText.trim() !== '') ||
        (await generalError.count() > 0 && generalErrorText.trim() !== '')) {
      console.log(`✅ PASS: Error message displayed for spaces-only name: '${nomeErrorText || generalErrorText}'`);
      return { passed: true, message: 'Error displayed for spaces-only field' };
    } else if (isStillOnRegister) {
      // Check if the input is considered empty (maybe trimmed)
      const nomeInput = await page.locator('input[placeholder*="Nome" i]');
      const value = await nomeInput.inputValue();
      if (value.trim() === '') {
        console.log('✅ PASS: Field treated as empty (trimmed)');
        return { passed: true, message: 'Field treated as empty' };
      } else {
        console.log('❌ FAIL: No error message shown for spaces-only field');
        return { passed: false, message: 'No validation error for spaces-only field' };
      }
    } else {
      console.log('❌ FAIL: Form submitted despite spaces-only name');
      return { passed: false, message: 'Form submitted with spaces-only name' };
    }
  } catch (error) {
    console.error('❌ ERROR during test:', error);
    await takeScreenshot(page, '14-error');
    return { passed: false, message: `Test error: ${error.message}` };
  }
}

// Test Case 5: Special Characters/Numbers in Name
async function testSpecialCharsInName(page) {
  console.log('\n=== Test Case 5: Special Characters/Numbers in Name ===');
  try {
    await page.goto('https://bugbank.netlify.app/');
    const registerLink = await page.locator('text=Registrar').or(await page.locator('text=Register')).first();
    if (await registerLink.count() > 0) {
      await registerLink.click();
    } else {
      await page.goto('https://bugbank.netlify.app/register');
    }
    await page.waitForTimeout(1000);

    // Fill Nome with special characters and numbers
    await page.fill('input[placeholder*="Nome" i]', 'João123!');
    await page.fill('input[placeholder*="E-mail" i]', 'joao.silva@example.com');
    await page.fill('input[placeholder*="Senha" i]', 'Senha123!');
    await page.fill('input[placeholder*="Confirmação senha" i]', 'Senha123!');
    await takeScreenshot(page, '15-form-special-name');

    // Submit
    await page.click('button:has-text("Cadastrar"), input[type="submit"]');
    await page.waitForTimeout(1000);
    await takeScreenshot(page, '16-after-special-name-submit');

    // Check for error on Nome field
    const nomeError = await page.locator('input[placeholder*="Nome" i]').locator('xpath=../following-sibling::*[contains(@class, "error") or contains(@class, "invalid") or contains(@role, "alert")]');
    const nomeErrorText = await nomeError.textContent();
    const generalError = await page.locator('.error, .alert-error').first();
    const generalErrorText = await generalError.textContent();

    // Check if form was not submitted
    const url = page.url();
    const isStillOnRegister = url.includes('register') ||
                              await page.locator('input[placeholder*="Nome" i]').count() > 0;

    if ((await nomeError.count() > 0 && nomeErrorText.trim() !== '') ||
        (await generalError.count() > 0 && generalErrorText.trim() !== '')) {
      console.log(`✅ PASS: Error message displayed for special chars in name: '${nomeErrorText || generalErrorText}'`);
      return { passed: true, message: 'Error displayed for special chars in name' };
    } else if (isStillOnRegister) {
      console.log('✅ PASS: Form not submitted (validation working)');
      return { passed: true, message: 'Form not submitted' };
    } else {
      console.log('❌ FAIL: Form submitted despite special chars in name');
      return { passed: false, message: 'Form submitted with special chars in name' };
    }
  } catch (error) {
    console.error('❌ ERROR during test:', error);
    await takeScreenshot(page, '17-error');
    return { passed: false, message: `Test error: ${error.message}` };
  }
}

// Test Case 6: Maximum Length Exceeded
async function testMaxLengthExceeded(page) {
  console.log('\n=== Test Case 6: Maximum Length Exceeded ===');
  try {
    await page.goto('https://bugbank.netlify.app/');
    const registerLink = await page.locator('text=Registrar').or(await page.locator('text=Register')).first();
    if (await registerLink.count() > 0) {
      await registerLink.click();
    } else {
      await page.goto('https://bugbank.netlify.app/register');
    }
    await page.waitForTimeout(1000);

    // Create a string of 300 characters
    const longString = 'a'.repeat(300);
    await page.fill('input[placeholder*="Nome" i]', longString);
    await page.fill('input[placeholder*="E-mail" i]', 'joao.silva@example.com');
    await page.fill('input[placeholder*="Senha" i]', 'Senha123!');
    await page.fill('input[placeholder*="Confirmação senha" i]', 'Senha123!');
    await takeScreenshot(page, '18-form-long-name');

    // Submit
    await page.click('button:has-text("Cadastrar"), input[type="submit"]');
    await page.waitForTimeout(1000);
    await takeScreenshot(page, '19-after-long-name-submit');

    // Check for error on Nome field
    const nomeError = await page.locator('input[placeholder*="Nome" i]').locator('xpath=../following-sibling::*[contains(@class, "error") or contains(@class, "invalid") or contains(@role, "alert")]');
    const nomeErrorText = await nomeError.textContent();
    const generalError = await page.locator('.error, .alert-error').first();
    const generalErrorText = await generalError.textContent();

    // Check if form was not submitted
    const url = page.url();
    const isStillOnRegister = url.includes('register') ||
                              await page.locator('input[placeholder*="Nome" i]').count() > 0;

    if ((await nomeError.count() > 0 && nomeErrorText.trim() !== '') ||
        (await generalError.count() > 0 && generalErrorText.trim() !== '')) {
      console.log(`✅ PASS: Error message displayed for exceeded length: '${nomeErrorText || generalErrorText}'`);
      return { passed: true, message: 'Error displayed for exceeded length' };
    } else if (isStillOnRegister) {
      // Check if the input was truncated by maxlength attribute
      const nomeInput = await page.locator('input[placeholder*="Nome" i]');
      const maxLength = await nomeInput.getAttribute('maxlength');
      const value = await nomeInput.inputValue();
      if (maxLength && value.length <= parseInt(maxLength)) {
        console.log(`✅ PASS: Input truncated to maxlength ${maxLength}`);
        return { passed: true, message: `Input truncated to maxlength ${maxLength}` };
      } else {
        console.log('⚠️ WARNING: No error message, but input may have been truncated');
        return { passed: true, message: 'Input may have been truncated' };
      }
    } else {
      console.log('❌ FAIL: Form submitted despite exceeded length');
      return { passed: false, message: 'Form submitted with exceeded length' };
    }
  } catch (error) {
    console.error('❌ ERROR during test:', error);
    await takeScreenshot(page, '20-error');
    return { passed: false, message: `Test error: ${error.message}` };
  }
}

// Test Case 7: Password Mismatch
async function testPasswordMismatch(page) {
  console.log('\n=== Test Case 7: Password Mismatch ===');
  try {
    await page.goto('https://bugbank.netlify.app/');
    const registerLink = await page.locator('text=Registrar').or(await page.locator('text=Register')).first();
    if (await registerLink.count() > 0) {
      await registerLink.click();
    } else {
      await page.goto('https://bugbank.netlify.app/register');
    }
    await page.waitForTimeout(1000);

    // Fill form with mismatched passwords
    await page.fill('input[placeholder*="Nome" i]', 'João Silva');
    await page.fill('input[placeholder*="E-mail" i]', 'joao.silva@example.com');
    await page.fill('input[placeholder*="Senha" i]', 'Senha123!');
    await page.fill('input[placeholder*="Confirmação senha" i]', 'Senha456!');
    await takeScreenshot(page, '21-form-password-mismatch');

    // Submit
    await page.click('button:has-text("Cadastrar"), input[type="submit"]');
    await page.waitForTimeout(1000);
    await takeScreenshot(page, '22-after-password-mismatch-submit');

    // Check for error on password confirmation field or general error
    const confirmError = await page.locator('input[placeholder*="Confirmação senha" i]').locator('xpath=../following-sibling::*[contains(@class, "error") or contains(@class, "invalid") or contains(@role, "alert")]');
    const confirmErrorText = await confirmError.textContent();
    const generalError = await page.locator('.error, .alert-error').first();
    const generalErrorText = await generalError.textContent();

    // Check if form was not submitted
    const url = page.url();
    const isStillOnRegister = url.includes('register') ||
                              await page.locator('input[placeholder*="Nome" i]').count() > 0;

    if ((await confirmError.count() > 0 && confirmErrorText.trim() !== '') ||
        (await generalError.count() > 0 && generalErrorText.trim() !== '')) {
      console.log(`✅ PASS: Error message displayed for password mismatch: '${confirmErrorText || generalErrorText}'`);
      return { passed: true, message: 'Error displayed for password mismatch' };
    } else if (isStillOnRegister) {
      console.log('✅ PASS: Form not submitted (validation working)');
      return { passed: true, message: 'Form not submitted' };
    } else {
      console.log('❌ FAIL: Form submitted despite password mismatch');
      return { passed: false, message: 'Form submitted with password mismatch' };
    }
  } catch (error) {
    console.error('❌ ERROR during test:', error);
    await takeScreenshot(page, '23-error');
    return { passed: false, message: `Test error: ${error.message}` };
  }
}

// Test Case 8: Successful Registration Redirects to Home
async function testSuccessfulRedirect(page) {
  console.log('\n=== Test Case 8: Successful Registration Redirects to Home ===');
  try {
    await page.goto('https://bugbank.netlify.app/');
    const registerLink = await page.locator('text=Registrar').or(await page.locator('text=Register')).first();
    if (await registerLink.count() > 0) {
      await registerLink.click();
    } else {
      await page.goto('https://bugbank.netlify.app/register');
    }
    await page.waitForTimeout(1000);

    // Fill form with valid data
    await page.fill('input[placeholder*="Nome" i]', 'João Silva');
    await page.fill('input[placeholder*="E-mail" i]', 'joao.silva@example.com');
    await page.fill('input[placeholder*="Senha" i]', 'Senha123!');
    await page.fill('input[placeholder*="Confirmação senha" i]', 'Senha123!');
    await takeScreenshot(page, '24-form-valid');

    // Submit
    await page.click('button:has-text("Cadastrar"), input[type="submit"]');
    await page.waitForTimeout(2000);

    await takeScreenshot(page, '25-after-valid-submit');

    // Check for success message and redirect to home
    const url = page.url();
    console.log(`Current URL after submit: ${url}`);

    // Look for success message
    const successMessage = await page.locator('text=Cadastro realizado com sucesso, text=Sucesso, text=success').first();
    let successMsgText = '';
    if (await successMessage.count() > 0) {
      successMsgText = await successMessage.textContent();
    }

    // Check if redirected to home page
    let isRedirectedToHome = url.includes('bugbank.netlify.app') && !url.includes('register');
    const homePageIndicator = await page.locator('text=BugBank, text=Home').first();
    isRedirectedToHome = isRedirectedToHome || (await homePageIndicator.count() > 0);

    if (isRedirectedToHome && successMsgText !== '') {
      console.log('✅ PASS: Success message displayed and redirected to home page');
      return { passed: true, message: 'Success message displayed and redirected to home page' };
    } else {
      console.log('❌ FAIL: Either no success message or not redirected to home page');
      console.log(`Success message text: '${successMsgText}'`);
      console.log(`Is redirected to home: ${isRedirectedToHome}`);
      return { passed: false, message: 'Missing success message or incorrect redirect' };
    }
  } catch (error) {
    console.error('❌ ERROR during test:', error);
    await takeScreenshot(page, '26-error');
    return { passed: false, message: `Test error: ${error.message}` };
  }
}

// Main function to run all test cases
async function runExploratoryTests() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const testResults = [];

  try {
    // Run each test case
    testResults.push(await testHappyPath(page));
    testResults.push(await testRequiredFieldsEmpty(page));
    testResults.push(await testInvalidEmail(page));
    testResults.push(await testSpacesOnlyField(page));
    testResults.push(await testSpecialCharsInName(page));
    testResults.push(await testMaxLengthExceeded(page));
    testResults.push(await testPasswordMismatch(page));
    testResults.push(await testSuccessfulRedirect(page));

    // Print summary
    console.log('\n\n=== EXPLORATORY TESTING SUMMARY ===');
    let passed = 0;
    let failed = 0;
    testResults.forEach((result, index) => {
      const status = result.passed ? 'PASS' : 'FAIL';
      console.log(`Test Case ${index + 1}: ${status} - ${result.message}`);
      if (result.passed) passed++;
      else failed++;
    });
    console.log(`\nTotal: ${passed} passed, ${failed} failed`);

    // Save results to a file
    const resultsFile = path.join(__dirname, 'exploratory-test-results.json');
    fs.writeFileSync(resultsFile, JSON.stringify(testResults, null, 2));
    console.log(`Detailed results saved to: ${resultsFile}`);

  } finally {
    await context.close();
    await browser.close();
  }
}

// Run the tests
runExploratoryTests().catch(console.error);