// Assertion utilities for test validations
class Assertions {
  /**
   * Assert that an element is visible
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} selector - CSS selector for the element
   * @param {string} message - Custom error message
   */
  static async toBeVisible(page, selector, message = `Element ${selector} should be visible`) {
    const element = page.locator(selector);
    await expect(element).toBeVisible({ timeout: 5000 });
  }

  /**
   * Assert that an element is not visible
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} selector - CSS selector for the element
   * @param {string} message - Custom error message
   */
  static async notToBeVisible(page, selector, message = `Element ${selector} should not be visible`) {
    const element = page.locator(selector);
    await expect(element).not.toBeVisible({ timeout: 5000 });
  }

  /**
   * Assert that an element contains specific text
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} selector - CSS selector for the element
   * @param {string} expectedText - Expected text content
   * @param {string} message - Custom error message
   */
  static async toContainText(page, selector, expectedText, message = `Element ${selector} should contain "${expectedText}"`) {
    const element = page.locator(selector);
    await expect(element).toContainText(expectedText, { timeout: 5000 });
  }

  /**
   * Assert that an element has specific text
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} selector - CSS selector for the element
   * @param {string} expectedText - Expected text content
   * @param {string} message - Custom error message
   */
  static async toHaveText(page, selector, expectedText, message = `Element ${selector} should have text "${expectedText}"`) {
    const element = page.locator(selector);
    await expect(element).toHaveText(expectedText, { timeout: 5000 });
  }

  /**
   * Assert that an input field has a specific value
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} selector - CSS selector for the input field
   * @param {string} expectedValue - Expected value
   * @param {string} message - Custom error message
   */
  static async toHaveValue(page, selector, expectedValue, message = `Input ${selector} should have value "${expectedValue}"`) {
    const element = page.locator(selector);
    await expect(element).toHaveValue(expectedValue, { timeout: 5000 });
  }

  /**
   * Assert that the current URL matches expected URL or pattern
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string|RegExp} expectedUrl - Expected URL string or regex pattern
   * @param {string} message - Custom error message
   */
  static async toHaveURL(page, expectedUrl, message = `URL should be "${expectedUrl}"`) {
    await expect(page).toHaveURL(expectedUrl, { timeout: 5000 });
  }

  /**
   * Assert that an element is enabled
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} selector - CSS selector for the element
   * @param {string} message - Custom error message
   */
  static async toBeEnabled(page, selector, message = `Element ${selector} should be enabled`) {
    const element = page.locator(selector);
    await expect(element).toBeEnabled({ timeout: 5000 });
  }

  /**
   * Assert that an element is disabled
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} selector - CSS selector for the element
   * @param {string} message - Custom error message
   */
  static async toBeDisabled(page, selector, message = `Element ${selector} should be disabled`) {
    const element = page.locator(selector);
    await expect(element).toBeDisabled({ timeout: 5000 });
  }

  /**
   * Assert that an element is checked (for checkboxes/radios)
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} selector - CSS selector for the element
   * @param {string} message - Custom error message
   */
  static async toBeChecked(page, selector, message = `Element ${selector} should be checked`) {
    const element = page.locator(selector);
    await expect(element).toBeChecked({ timeout: 5000 });
  }

  /**
   * Assert that an element is not checked (for checkboxes/radios)
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} selector - CSS selector for the element
   * @param {string} message - Custom error message
   */
  static async notToBeChecked(page, selector, message = `Element ${selector} should not be checked`) {
    const element = page.locator(selector);
    await expect(element).not.toBeChecked({ timeout: 5000 });
  }

  /**
   * Assert that an element has a specific attribute with expected value
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} selector - CSS selector for the element
   * @param {string} attributeName - Name of the attribute
   * @param {string} expectedValue - Expected value of the attribute
   * @param {string} message - Custom error message
   */
  static async toHaveAttribute(page, selector, attributeName, expectedValue, message = `Element ${selector} should have attribute ${attributeName}="${expectedValue}"`) {
    const element = page.locator(selector);
    await expect(element).toHaveAttribute(attributeName, expectedValue, { timeout: 5000 });
  }

  /**
   * Assert that an element has a specific CSS class
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} selector - CSS selector for the element
   * @param {string} className - Expected CSS class name
   * @param {string} message - Custom error message
   */
  static async toHaveClass(page, selector, className, message = `Element ${selector} should have class "${className}"`) {
    const element = page.locator(selector);
    await expect(element).toHaveClass(className, { timeout: 5000 });
  }

  /**
   * Assert that an element is empty (has no text content)
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} selector - CSS selector for the element
   * @param {string} message - Custom error message
   */
  static async toBeEmpty(page, selector, message = `Element ${selector} should be empty`) {
    const element = page.locator(selector);
    await expect(element).toBeEmpty({ timeout: 5000 });
  }

  /**
   * Assert that an element is not empty (has text content)
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} selector - CSS selector for the element
   * @param {string} message - Custom error message
   */
  static async notToBeEmpty(page, selector, message = `Element ${selector} should not be empty`) {
    const element = page.locator(selector);
    await expect(element).not.toBeEmpty({ timeout: 5000 });
  }

  /**
   * Assert that the page title matches expected title
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} expectedTitle - Expected page title
   * @param {string} message - Custom error message
   */
  static async toHaveTitle(page, expectedTitle, message = `Page title should be "${expectedTitle}"`) {
    await expect(page).toHaveTitle(expectedTitle, { timeout: 5000 });
  }

  /**
   * Assert that the page title contains expected text
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} expectedTitleSubstring - Expected substring in page title
   * @param {string} message - Custom error message
   */
  static async toContainTitle(page, expectedTitleSubstring, message = `Page title should contain "${expectedTitleSubstring}"`) {
    await expect(page).toContainTitle(expectedTitleSubstring, { timeout: 5000 });
  }

  /**
   * Assert that an element has a specific count
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} selector - CSS selector for the elements
   * @param {number} expectedCount - Expected number of elements
   * @param {string} message - Custom error message
   */
  static async toHaveCount(page, selector, expectedCount, message = `Expected ${expectedCount} elements matching ${selector}`) {
    const elements = page.locator(selector);
    await expect(elements).toHaveCount(expectedCount, { timeout: 5000 });
  }

  /**
   * Assert that an element is focused
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} selector - CSS selector for the element
   * @param {string} message - Custom error message
   */
  static async toBeFocused(page, selector, message = `Element ${selector} should be focused`) {
    const element = page.locator(selector);
    await expect(element).toBeFocused({ timeout: 5000 });
  }

  /**
   * Assert that an element is not focused
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} selector - CSS selector for the element
   * @param {string} message - Custom error message
   */
  static async notToBeFocused(page, selector, message = `Element ${selector} should not be focused`) {
    const element = page.locator(selector);
    await expect(element).not.toBeFocused({ timeout: 5000 });
  }

  /**
   * Assert that an element is editable (for contenteditable or input/textarea)
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} selector - CSS selector for the element
   * @param {string} message - Custom error message
   */
  static async toBeEditable(page, selector, message = `Element ${selector} should be editable`) {
    const element = page.locator(selector);
    await expect(element).toBeEditable({ timeout: 5000 });
  }

  /**
   * Assert that an element is not editable
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} selector - CSS selector for the element
   * @param {string} message - Custom error message
   */
  static async notToBeEditable(page, selector, message = `Element ${selector} should not be editable`) {
    const element = page.locator(selector);
    await expect(element).not.toBeEditable({ timeout: 5000 });
  }
}

module.exports = Assertions;