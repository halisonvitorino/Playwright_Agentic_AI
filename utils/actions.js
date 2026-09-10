// Action utilities for user interactions
class Actions {
  /**
   * Fill a form field with text
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} selector - CSS selector for the input field
   * @param {string} text - Text to fill into the field
   */
  static async fillField(page, selector, text) {
    const field = page.locator(selector);
    await field.waitFor({ state: 'visible', timeout: 5000 });
    await field.click();
    await field.fill(text);
  }

  /**
   * Click a button or element
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} selector - CSS selector for the clickable element
   */
  static async clickElement(page, selector) {
    const element = page.locator(selector);
    await element.waitFor({ state: 'visible', timeout: 5000 });
    await element.click();
  }

  /**
   * Navigate to a URL
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} url - URL to navigate to
   */
  static async navigateTo(page, url) {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });
  }

  /**
   * Wait for an element to be visible
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} selector - CSS selector for the element
   * @param {number} timeoutMs - Timeout in milliseconds (default: 5000)
   */
  static async waitForElement(page, selector, timeoutMs = 5000) {
    return page.locator(selector).waitFor({ state: 'visible', timeout: timeoutMs });
  }

  /**
   * Get text content of an element
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} selector - CSS selector for the element
   * @returns {Promise<string>} Text content of the element
   */
  static async getText(page, selector) {
    const element = page.locator(selector);
    await element.waitFor({ state: 'visible', timeout: 5000 });
    return element.textContent();
  }

  /**
   * Check if an element is visible
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} selector - CSS selector for the element
   * @returns {Promise<boolean>} True if element is visible
   */
  static async isVisible(page, selector) {
    const element = page.locator(selector);
    try {
      await element.waitFor({ state: 'visible', timeout: 2000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Take a screenshot
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} name - Name for the screenshot file
   * @returns {Promise<string>} Path to the saved screenshot
   */
  static async takeScreenshot(page, name) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `screenshots/${name}-${timestamp}.png`;
    await page.screenshot({ path: filename, fullPage: true });
    return filename;
  }
}

module.exports = Actions;