# ⚙️ STEP 4: Generate Automation Scripts

## Prompt:

Create automated test scripts using the playwright-test-generator agent located on .github\agents

First, review:

1. Test plan from: test-plans/test-plan-feat-001.md (for test scenarios and steps)
2. The exploratory testing results from Step 3 (for actual element selectors and UI insights)

Using insights from the manual exploratory testing:

- Leverage the element selectors and locators that were successfully used in Step 3
- Use stable element properties (IDs, data attributes, roles), following the best practices discovered during exploration
- Apply wait strategies and UI behaviors observed during manual testing
- Incorporate any workarounds for UI quirks discovered

Generate Playwright JavaScript automation scripts:

1. Use the page Object approach
2. Organize for use on scripts:

- Actions into files named actions.js in: utils/
- Assertions into files named assertions.js in: utils/
- Configs into files named config.js in: utils/
- Dynamic test data into files named test-data.js in: utils/
- Page data into files named feat-001-page.js in: pages/
- Scripts for each test scenario from the test plan using the actions, assertions, configs and test data in: tests/

3. Use the test case names and steps from the test plan
4. Use reliable selectors and strategies from exploratory testing - Step 3
5. Create a BasePage and put there all common methods
6. Each test must be independent with it own 'beforeEach'

Requirements for all scripts:

- Use JavaScript when creating test scripts
- Implement retry logic for dynamic elements
- Follow Playwright best practices
- Include proper assertions using expect()
- Use descriptive test names matching the format in the test plan
- Use robust element selectors discovered during manual testing
- Add comments for complex steps
- Use proper wait strategies based on actual application behavior
- Use the actions,assertions, configs and test data organized on: utils/ for the test scripts
- Add proper test hooks (beforeEach, afterEach)

### Expected Output:

- Test suite files created in tests/ based on test plan scenarios
- Scripts using robust selectors discovered during exploratory testing
- All scripts follow Playwright best practices
