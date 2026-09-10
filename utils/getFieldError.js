// Utility to get the error message for a specific field
async function getFieldError(page, fieldPlaceholder) {
  const fieldInput = await page.locator(`input[placeholder="${fieldPlaceholder}"]`);
  // Get the parent div and then all p.input__warging inside it
  const parentDiv = await fieldInput.locator('xpath=..');
  const errorElements = await parentDiv.locator('p.input__warging');

  // Check each error element and return the first one with non-empty text
  const count = await errorElements.count();
  for (let i = 0; i < count; i++) {
    const text = await errorElements.nth(i).textContent();
    if (text.trim() !== '') {
      return text.trim();
    }
  }

  // If all are empty, return empty string
  return '';
}

module.exports = { getFieldError };