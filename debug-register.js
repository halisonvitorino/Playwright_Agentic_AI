const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false }); // Set to false to see the browser
  const page = await browser.newPage();
  await page.goto('https://bugbank.netlify.app/');
  await page.waitForTimeout(2000);

  // Click the "Registrar" button to switch to registration form
  const registrarButton = await page.locator('button:has-text("Registrar")').first();
  console.log('Found registrar button:', await registrarButton.count() > 0);
  if (await registrarButton.count() > 0) {
    await registrarButton.click();
    await page.waitForTimeout(2000);
    console.log('Clicked Registrar button');
  }

  // Now get the form again
  const form = await page.$('form');
  if (form) {
    const formHTML = await form.evaluate(f => f.innerHTML);
    console.log('Form HTML after clicking Registrar:');
    console.log(formHTML);
  }

  // Get all inputs and their placeholders
  const inputs = await page.$$('input');
  for (const input of inputs) {
    const placeholder = await input.getAttribute('placeholder');
    const type = await input.getAttribute('type');
    const name = await input.getAttribute('name');
    const id = await input.getAttribute('id');
    console.log(`Input: type=${type}, name=${name}, id=${id}, placeholder=${placeholder}`);
  }

  // Also check if there are any error message elements
  const errorElements = await page.$$('.error, .alert-error, [role="alert"], .invalid-feedback, .error-message');
  console.log(`Found ${errorElements.length} potential error elements`);
  for (const el of errorElements) {
    const text = await el.textContent();
    console.log(`Error element text: "${text}"`);
  }

  await browser.close();
})();