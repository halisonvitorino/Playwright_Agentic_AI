const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://bugbank.netlify.app/");
  console.log("Navigated to home page");
  // Look for the registration link
  const registers = await page.$$eval("a, button, link", (els) =>
    els.map((e) => ({
      text: e.innerText.trim(),
      href: e.getAttribute("href"),
      tagName: e.tagName,
    })),
  );
  console.log("Found links/buttons:", registers);
  // Try to click on the registration link/button
  let clicked = false;
  for (const el of await page.$$("a, button, link")) {
    const text = await el.innerText();
    if (
      text.toLowerCase().includes("registrar") ||
      text.toLowerCase().includes("register")
    ) {
      await el.click();
      console.log("Clicked on registration element:", text);
      clicked = true;
      break;
    }
  }
  if (!clicked) {
    console.log(
      "Could not find registration link, trying direct navigation to register page",
    );
    // Maybe the registration page is at a known path?
    await page.goto("https://bugbank.netlify.app/register");
  }
  await page.waitForTimeout(2000);
  console.log("Current URL:", page.url());
  // Now we are on the registration page, let's get the form
  const form = await page.$("form");
  if (form) {
    const formHTML = await form.evaluate((f) => f.outerHTML);
    console.log("Form HTML:", formHTML);
    // Get all input fields
    const inputs = await form.$$eval("input, select, textarea", (els) =>
      els.map((el) => ({
        type: el.type,
        name: el.name,
        id: el.id,
        placeholder: el.placeholder,
        required: el.required,
      })),
    );
    console.log("Form fields:", inputs);
  } else {
    console.log("No form found on the page");
  }
  await browser.close();
})();
