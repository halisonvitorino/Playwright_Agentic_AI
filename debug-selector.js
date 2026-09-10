const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://bugbank.netlify.app/');

  // Click to registration form
  const registrarButton = await page.locator('button:has-text("Registrar")').first();
  if (await registrarButton.count() > 0) {
    await registrarButton.click();
    await page.waitForTimeout(1000);
  }

  // Test different selectors for error message
  console.log('Testing selectors for error message...');

  // 1. Direct p.input__warging
  const directErrors = await page.locator('p.input__warging');
  const directCount = await directErrors.count();
  console.log(`Found ${directCount} direct p.input__warging elements`);

  for (let i = 0; i < directCount; i++) {
    const text = await directErrors.nth(i).textContent();
    console.log(`  Error ${i}: "${text}"`);
  }

  // 2. Error after email input
  const emailInput = await page.locator('input[placeholder="Informe seu e-mail"]');
  const emailError = await emailInput.locator('xpath=../following-sibling::p[@class="input__warging"]');
  const emailErrorCount = await emailError.count();
  console.log(`Found ${emailErrorCount} error elements after email input using xpath=../following-sibling::p[@class="input__warging"]`);

  for (let i = 0; i < emailErrorCount; i++) {
    const text = await emailError.nth(i).textContent();
    console.log(`  Email error ${i}: "${text}"`);
  }

  // 3. Error after email input - alternative
  const emailErrorAlt = await emailInput.locator('xpath=../p[@class="input__warging"]');
  const emailErrorAltCount = await emailErrorAlt.count();
  console.log(`Found ${emailErrorAltCount} error elements after email input using xpath=../p[@class="input__warging"]`);

  for (let i = 0; i < emailErrorAltCount; i++) {
    const text = await emailErrorAlt.nth(i).textContent();
    console.log(`  Email error alt ${i}: "${text}"`);
  }

  // 4. Error after email input - using CSS
  const parentDiv = await emailInput.locator('xpath=..');
  const emailErrorCss = await parentDiv.locator('p.input__warging');
  const emailErrorCssCount = await emailErrorCss.count();
  console.log(`Found ${emailErrorCssCount} error elements after email input using CSS parent -> p.input__warging`);

  for (let i = 0; i < emailErrorCssCount; i++) {
    const text = await emailErrorCss.nth(i).textContent();
    console.log(`  Email error css ${i}: "${text}"`);
  }

  // 5. Test with empty fields to see error messages
  console.log('\nTesting with empty fields...');
  const cadastrarButton = await page.locator('button:has-text("Cadastrar")').first();
  if (await cadastrarButton.count() > 0) {
    await cadastrarButton.click();
    await page.waitForTimeout(1000);

    // Check errors after submit
    const errorsAfterSubmit = await page.locator('p.input__warging');
    const errorsAfterCount = await errorsAfterSubmit.count();
    console.log(`Found ${errorsAfterCount} error elements after submit`);

    for (let i = 0; i < errorsAfterCount; i++) {
      const text = await errorsAfterSubmit.nth(i).textContent();
      console.log(`  Error after submit ${i}: "${text}"`);
    }
  }

  await browser.close();
})();