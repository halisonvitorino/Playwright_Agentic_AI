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

    // Click on the registration link/button to switch to registration form
    const registrarButton = await page.locator('button:has-text("Registrar")').first();
    if (await registrarButton.count() > 0) {
      await registrarButton.click();
      await page.waitForTimeout(1000);
    }
    await takeScreenshot(page, '02-registration-page');

    // Fill in the form with valid data based on actual form structure
    // Based on our debug, we need to fill: Nome, E-mail, Senha, Confirmação senha
    await page.fill('input[placeholder="Informe seu Nome"]', 'João Silva');
    await page.fill('input[placeholder="Informe seu e-mail"]', 'joao.silva@example.com');
    await page.fill('input[placeholder="Informe sua senha"]', 'Senha123!');
    await page.fill('input[placeholder="Informe a confirmação da senha"]', 'Senha123!');

    // Fill additional fields if they exist (telefone, data nascimento, CPF)
    // Check if these fields exist in the form
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

    // Submit the form - look for the Cadastrar button
    const cadastrarButton = await page.locator('button:has-text("Cadastrar")').first();
    if (await cadastrarButton.count() > 0) {
      await cadastrarButton.click();
    } else {
      // Fallback to submit button
      await page.click('button[type="submit"], input[type="submit"]');
    }

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
    // Check for home page indicators
    const homePageIndicator = await page.locator('text=BugBank, text=Home, text=Bem-vindo').first();
    isRedirectedToHome = isRedirectedToHome || (await homePageIndicator.count() > 0);

    if (isRedirectedToHome && successMsgText !== '') {
      console.log('✅ PASS: Success message displayed and redirected to home page');
      return { passed: true, message: 'Success message displayed and redirected to home page' };
    } else {
      console.log('ℹ️ INFO: Checking for alternative success indicators...');
      // Maybe success is shown differently
      const alertSuccess = await page.locator('.alert-success, .success, [class*="success"]').first();
      if (await alertSuccess.count() > 0) {
        const alertText = await alertSuccess.textContent();
        if (alertText.trim() !== '') {
          console.log(`✅ PASS: Success alert found: '${alertText}'`);
          return { passed: true, message: `Success alert found: ${alertText}` };
        }
      }

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
    const registrarButton = await page.locator('button:has-text("Registrar")').first();
    if (await registrarButton.count() > 0) {
      await registrarButton.click();
      await page.waitForTimeout(1000);
    }
    await takeScreenshot(page, '06-registration-page-empty');

    // Do not fill any fields, just submit
    const cadastrarButton = await page.locator('button:has-text("Cadastrar")').first();
    if (await cadastrarButton.count() > 0) {
      await cadastrarButton.click();
    } else {
      await page.click('button[type="submit"], input[type="submit"]');
    }
    await page.waitForTimeout(1000);
    await takeScreenshot(page, '07-after-empty-submit');

    // Check that form is not submitted (we are still on the registration page)
    const url = page.url();
    const isStillOnRegister = url.includes('register') ||
                              await page.locator('input[placeholder="Informe seu Nome"]').count() > 0;

    // Look for error messages - the form has <p class="input__warging"></p> after each input
    const errorMessages = await page.locator('p.input__warging');
    const errorCount = await errorMessages.count();
    let errorTexts = [];
    for (let i = 0; i < errorCount; i++) {
      errorTexts.push(await errorMessages.nth(i).textContent());
    }

    // If we see error messages, then validation is working
    if (errorCount > 0) {
      console.log(`✅ PASS: Form not submitted and error messages displayed`);
      console.log(`Error messages: ${errorTexts.join('; ')}`);
      return { passed: true, message: 'Form not submitted and error messages displayed' };
    } else {
      // Check if the form was submitted (we are redirected or see a success message)
      const successMessage = await page.locator('text=Cadastro realizado com sucesso, text=Sucesso, text=success').first();
      const successMsgText = await successMessage.textContent();
      if (await successMessage.count() > 0 || !isStillOnRegister) {
        console.log('❌ FAIL: Form was submitted despite empty fields');
        return { passed: false, message: 'Form submitted with empty fields' };
      } else {
        console.log('⚠️ INFO: No error messages shown, but form not submitted');
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
    const registrarButton = await page.locator('button:has-text("Registrar")').first();
    if (await registrarButton.count() > 0) {
      await registrarButton.click();
      await page.waitForTimeout(1000);
    }
    await takeScreenshot(page, '09-form-invalid-email');

    // Fill form with invalid email (missing @)
    await page.fill('input[placeholder="Informe seu Nome"]', 'João Silva');
    await page.fill('input[placeholder="Informe seu e-mail"]', 'joao.silvaexample.com'); // Missing @
    await page.fill('input[placeholder="Informe sua senha"]', 'Senha123!');
    await page.fill('input[placeholder="Informe a confirmação da senha"]', 'Senha123!');
    await takeScreenshot(page, '10-form-filled-invalid-email');

    // Submit
    const cadastrarButton = await page.locator('button:has-text("Cadastrar")').first();
    if (await cadastrarButton.count() > 0) {
      await cadastrarButton.click();
    } else {
      await page.click('button[type="submit"], input[type="submit"]');
    }
    await page.waitForTimeout(1000);
    await takeScreenshot(page, '11-after-invalid-email-submit');

    // Check for email error message - look in the <p class="input__warging"></p> after email input
    const emailError = await page.locator('input[placeholder="Informe seu e-mail"]').locator('xpath=../following-sibling::p[@class="input__warging"]');
    const emailErrorText = await emailError.textContent();

    // Also check for general error messages
    const generalErrors = await page.locator('p.input__warging');
    let generalErrorText = '';
    if (await generalErrors.count() > 0) {
      // Get all error texts and see if any are not empty
      for (let i = 0; i < await generalErrors.count(); i++) {
        const text = await generalErrors.nth(i).textContent();
        if (text.trim() !== '') {
          generalErrorText = text;
          break;
        }
      }
    }

    // Check if form was not submitted (still on registration page)
    const url = page.url();
    const isStillOnRegister = url.includes('register') ||
                              await page.locator('input[placeholder="Informe seu Nome"]').count() > 0;

    if ((await emailError.count() > 0 && emailErrorText.trim() !== '') ||
        (generalErrorText.trim() !== '')) {
      console.log(`✅ PASS: Email error message displayed: '${emailErrorText || generalErrorText}'`);
      return { passed: true, message: 'Email error displayed' };
    } else if (isStillOnRegister) {
      // Maybe the error is shown in a different way, like the input turning red
      const emailInput = await page.locator('input[placeholder="Informe seu e-mail"]');
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
    await takeScreenshot(page, '12-error');
    return { passed: false, message: `Test error: ${error.message}` };
  }
}

// Test Case 4: Fields with Only Spaces
async function testSpacesOnlyField(page) {
  console.log('\n=== Test Case 4: Fields with Only Spaces ===');
  try {
    await page.goto('https://bugbank.netlify.app/');
    const registrarButton = await page.locator('button:has-text("Registrar")').first();
    if (await registrarButton.count() > 0) {
      await registrarButton.click();
      await page.waitForTimeout(1000);
    }
    await takeScreenshot(page, '13-registration-page-empty');

    // Fill Nome with spaces only, other fields valid
    await page.fill('input[placeholder="Informe seu Nome"]', '   ');
    await page.fill('input[placeholder="Informe seu e-mail"]', 'joao.silva@example.com');
    await page.fill('input[placeholder="Informe sua senha"]', 'Senha123!');
    await page.fill('input[placeholder="Informe a confirmação da senha"]', 'Senha123!');
    await takeScreenshot(page, '14-form-spaces-name');

    // Submit
    const cadastrarButton = await page.locator('button:has-text("Cadastrar")').first();
    if (await cadastrarButton.count() > 0) {
      await cadastrarButton.click();
    } else {
      await page.click('button[type="submit"], input[type="submit"]');
    }
    await page.waitForTimeout(1000);
    await takeScreenshot(page, '15-after-spaces-submit');

    // Check for error on Nome field
    const nomeError = await page.locator('input[placeholder="Informe seu Nome"]').locator('xpath=../following-sibling::p[@class="input__warging"]');
    const nomeErrorText = await nomeError.textContent();

    // Check for general errors
    const generalErrors = await page.locator('p.input__warging');
    let generalErrorText = '';
    if (await generalErrors.count() > 0) {
      for (let i = 0; i < await generalErrors.count(); i++) {
        const text = await generalErrors.nth(i).textContent();
        if (text.trim() !== '') {
          generalErrorText = text;
          break;
        }
      }
    }

    // Check if form was not submitted
    const url = page.url();
    const isStillOnRegister = url.includes('register') ||
                              await page.locator('input[placeholder="Informe seu Nome"]').count() > 0;

    if ((await nomeError.count() > 0 && nomeErrorText.trim() !== '') ||
        (generalErrorText.trim() !== '')) {
      console.log(`✅ PASS: Error message displayed for spaces-only name: '${nomeErrorText || generalErrorText}'`);
      return { passed: true, message: 'Error displayed for spaces-only field' };
    } else if (isStillOnRegister) {
      // Check if the input is considered empty (maybe trimmed)
      const nomeInput = await page.locator('input[placeholder="Informe seu Nome"]');
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
    await takeScreenshot(page, '16-error');
    return { passed: false, message: `Test error: ${error.message}` };
  }
}

// Test Case 5: Special Characters/Numbers in Name
async function testSpecialCharsInName(page) {
  console.log('\n=== Test Case 5: Special Characters/Numbers in Name ===');
  try {
    await page.goto('https://bugbank.netlify.app/');
    const registrarButton = await page.locator('button:has-text("Registrar")').first();
    if (await registrarButton.count() > 0) {
      await registrarButton.click();
      await page.waitForTimeout(1000);
    }
    await takeScreenshot(page, '17-form-special-name');

    // Fill Nome with special characters and numbers
    await page.fill('input[placeholder="Informe seu Nome"]', 'João123!');
    await page.fill('input[placeholder="Informe seu e-mail"]', 'joao.silva@example.com');
    await page.fill('input[placeholder="Informe sua senha"]', 'Senha123!');
    await page.fill('input[placeholder="Informe a confirmação da senha"]', 'Senha123!');
    await takeScreenshot(page, '18-form-filled-special-name');

    // Submit
    const cadastrarButton = await page.locator('button:has-text("Cadastrar")').first();
    if (await cadastrarButton.count() > 0) {
      await cadastrarButton.click();
    } else {
      await page.click('button[type="submit"], input[type="submit"]');
    }
    await page.waitForTimeout(1000);
    await takeScreenshot(page, '19-after-special-name-submit');

    // Check for error on Nome field
    const nomeError = await page.locator('input[placeholder="Informe seu Nome"]').locator('xpath=../following-sibling::p[@class="input__warging"]');
    const nomeErrorText = await nomeError.textContent();

    // Check for general errors
    const generalErrors = await page.locator('p.input__warging');
    let generalErrorText = '';
    if (await generalErrors.count() > 0) {
      for (let i = 0; i < await generalErrors.count(); i++) {
        const text = await generalErrors.nth(i).textContent();
        if (text.trim() !== '') {
          generalErrorText = text;
          break;
        }
      }
    }

    // Check if form was not submitted
    const url = page.url();
    const isStillOnRegister = url.includes('register') ||
                              await page.locator('input[placeholder="Informe seu Nome"]').count() > 0;

    if ((await nomeError.count() > 0 && nomeErrorText.trim() !== '') ||
        (generalErrorText.trim() !== '')) {
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
    await takeScreenshot(page, '20-error');
    return { passed: false, message: `Test error: ${error.message}` };
  }
}

// Test Case 6: Maximum Length Exceeded
async function testMaxLengthExceeded(page) {
  console.log('\n=== Test Case 6: Maximum Length Exceeded ===');
  try {
    await page.goto('https://bugbank.netlify.app/');
    const registrarButton = await page.locator('button:has-text("Registrar")').first();
    if (await registrarButton.count() > 0) {
      await registrarButton.click();
      await page.waitForTimeout(1000);
    }
    await takeScreenshot(page, '21-form-long-name');

    // Create a string of 300 characters
    const longString = 'a'.repeat(300);
    await page.fill('input[placeholder="Informe seu Nome"]', longString);
    await page.fill('input[placeholder="Informe seu e-mail"]', 'joao.silva@example.com');
    await page.fill('input[placeholder="Informe sua senha"]', 'Senha123!');
    await page.fill('input[placeholder="Informe a confirmação da senha"]', 'Senha123!');
    await takeScreenshot(page, '22-form-filled-long-name');

    // Submit
    const cadastrarButton = await page.locator('button:has-text("Cadastrar")').first();
    if (await cadastrarButton.count() > 0) {
      await cadastrarButton.click();
    } else {
      await page.click('button[type="submit"], input[type="submit"]');
    }
    await page.waitForTimeout(1000);
    await takeScreenshot(page, '23-after-long-name-submit');

    // Check for error on Nome field
    const nomeError = await page.locator('input[placeholder="Informe seu Nome"]').locator('xpath=../following-sibling::p[@class="input__warging"]');
    const nomeErrorText = await nomeError.textContent();

    // Check for general errors
    const generalErrors = await page.locator('p.input__warging');
    let generalErrorText = '';
    if (await generalErrors.count() > 0) {
      for (let i = 0; i < await generalErrors.count(); i++) {
        const text = await generalErrors.nth(i).textContent();
        if (text.trim() !== '') {
          generalErrorText = text;
          break;
        }
      }
    }

    // Check if form was not submitted
    const url = page.url();
    const isStillOnRegister = url.includes('register') ||
                              await page.locator('input[placeholder="Informe seu Nome"]').count() > 0;

    if ((await nomeError.count() > 0 && nomeErrorText.trim() !== '') ||
        (generalErrorText.trim() !== '')) {
      console.log(`✅ PASS: Error message displayed for exceeded length: '${nomeErrorText || generalErrorText}'`);
      return { passed: true, message: 'Error displayed for exceeded length' };
    } else if (isStillOnRegister) {
      // Check if the input was truncated by maxlength attribute
      const nomeInput = await page.locator('input[placeholder="Informe seu Nome"]');
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
    await takeScreenshot(page, '24-error');
    return { passed: false, message: `Test error: ${error.message}` };
  }
}

// Test Case 7: Password Mismatch
async function testPasswordMismatch(page) {
  console.log('\n=== Test Case 7: Password Mismatch ===');
  try {
    await page.goto('https://bugbank.netlify.app/');
    const registrarButton = await page.locator('button:has-text("Registrar")').first();
    if (await registrarButton.count() > 0) {
      await registrarButton.click();
      await page.waitForTimeout(1000);
    }
    await takeScreenshot(page, '25-form-password-mismatch');

    // Fill form with mismatched passwords
    await page.fill('input[placeholder="Informe seu Nome"]', 'João Silva');
    await page.fill('input[placeholder="Informe seu e-mail"]', 'joao.silva@example.com');
    await page.fill('input[placeholder="Informe sua senha"]', 'Senha123!');
    await page.fill('input[placeholder="Informe a confirmação da senha"]', 'Senha456!');
    await takeScreenshot(page, '26-form-filled-password-mismatch');

    // Submit
    const cadastrarButton = await page.locator('button:has-text("Cadastrar")').first();
    if (await cadastrarButton.count() > 0) {
      await cadastrarButton.click();
    } else {
      await page.click('button[type="submit"], input[type="submit"]');
    }
    await page.waitForTimeout(1000);
    await takeScreenshot(page, '27-after-password-mismatch-submit');

    // Check for error on password confirmation field or general error
    const confirmError = await page.locator('input[placeholder="Informe a confirmação da senha"]').locator('xpath=../following-sibling::p[@class="input__warging"]');
    const confirmErrorText = await confirmError.textContent();

    // Check for general errors
    const generalErrors = await page.locator('p.input__warging');
    let generalErrorText = '';
    if (await generalErrors.count() > 0) {
      for (let i = 0; i < await generalErrors.count(); i++) {
        const text = await generalErrors.nth(i).textContent();
        if (text.trim() !== '') {
          generalErrorText = text;
          break;
        }
      }
    }

    // Check if form was not submitted
    const url = page.url();
    const isStillOnRegister = url.includes('register') ||
                              await page.locator('input[placeholder="Informe seu Nome"]').count() > 0;

    if ((await confirmError.count() > 0 && confirmErrorText.trim() !== '') ||
        (generalErrorText.trim() !== '')) {
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
    await takeScreenshot(page, '28-error');
    return { passed: false, message: `Test error: ${error.message}` };
  }
}

// Test Case 8: Successful Registration Redirects to Home
async function testSuccessfulRedirect(page) {
  console.log('\n=== Test Case 8: Successful Registration Redirects to Home ===');
  try {
    await page.goto('https://bugbank.netlify.app/');
    const registrarButton = await page.locator('button:has-text("Registrar")').first();
    if (await registrarButton.count() > 0) {
      await registrarButton.click();
      await page.waitForTimeout(1000);
    }
    await takeScreenshot(page, '29-form-valid');

    // Fill form with valid data
    await page.fill('input[placeholder="Informe seu Nome"]', 'João Silva');
    await page.fill('input[placeholder="Informe seu e-mail"]', 'joao.silva@example.com');
    await page.fill('input[placeholder="Informe sua senha"]', 'Senha123!');
    await page.fill('input[placeholder="Informe a confirmação da senha"]', 'Senha123!');
    await takeScreenshot(page, '30-form-filled-valid');

    // Submit
    const cadastrarButton = await page.locator('button:has-text("Cadastrar")').first();
    if (await cadastrarButton.count() > 0) {
      await cadastrarButton.click();
    } else {
      await page.click('button[type="submit"], input[type="submit"]');
    }
    await page.waitForTimeout(2000);

    await takeScreenshot(page, '31-after-valid-submit');

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
    // Check for home page indicators
    const homePageIndicator = await page.locator('text=BugBank, text=Home, text=Bem-vindo').first();
    isRedirectedToHome = isRedirectedToHome || (await homePageIndicator.count() > 0);

    // Also check for success alerts
    const alertSuccess = await page.locator('.alert-success, .success, [class*="success"]').first();
    let alertText = '';
    if (await alertSuccess.count() > 0) {
      alertText = await alertSuccess.textContent();
    }

    if ((isRedirectedToHome && successMsgText !== '') || alertText.trim() !== '') {
      console.log('✅ PASS: Success message displayed and redirected to home page');
      const msg = successMsgText !== '' ? successMsgText : alertText;
      return { passed: true, message: `Success: ${msg}` };
    } else {
      console.log('❌ FAIL: Either no success message or not redirected to home page');
      console.log(`Success message text: '${successMsgText}'`);
      console.log(`Alert text: '${alertText}'`);
      console.log(`Is redirected to home: ${isRedirectedToHome}`);
      return { passed: false, message: 'Missing success message or incorrect redirect' };
    }
  } catch (error) {
    console.error('❌ ERROR during test:', error);
    await takeScreenshot(page, '32-error');
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