const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://bugbank.netlify.app/');
  // Click on registration link
  const registerLink = await page.locator('text=Registrar').or(await page.locator('text=Register')).first();
  if (await registerLink.count() > 0) {
    await registerLink.click();
  } else {
    await page.goto('https://bugbank.netlify.app/register');
  }
  await page.waitForTimeout(1000);

  // Get the form
  const form = await page.$('form');
  if (form) {
    const formHTML = await form.evaluate(f => f.innerHTML);
    console.log('Form HTML:');
    console.log(formHTML);
  } else {
    console.log('No form found');
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

  await browser.close();
})();
