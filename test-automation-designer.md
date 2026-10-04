# ⚙️ STEP 4: Generate Automation Scripts

## Prompt:

Create automated test scripts using the playwright-test-generator agent.

Review:

1. Test plan from: test-plans/[test-plan-feat-001.md] (for test scenarios and steps)
2. Exploratory testing results from Step 3 (for actual element selectors and UI insights)

Using insights from the manual exploratory testing:

- Leverage the element selectors and locators that were successfully used in Step 3
- Use stable element properties (IDs, data attributes, roles), following the best practices discovered during exploration
- Apply wait strategies and UI behaviors observed during manual testing
- Incorporate any workarounds for UI quirks discovered

Generate Playwright JavaScript automation scripts:

1. Use the page Object approach
2. Organize the actions for use on scripts into appropriate files named actions.js in: utils/
3. Organize the assertions for use on scripts into appropriate files named assertions.js in: utils/
4. Organize the configs for use on scripts (if needed) into appropriate files named config.js in: utils/
5. Organize the dinamic test data for use on scripts into appropriate files named test-data.js in: utils/
6. Organize the page data/behavior for use on scripts into appropriate files named feat-002-page.js in: pages/
7. Create scripts for each test scenario from the test plan using the actions,assertions, configs and test data organized on: utils/
8. Organize scripts into appropriate test suite files in: tests/test-plan-feat-002/
9. Use the test case names and steps from the test plan
10. Use reliable selectors and strategies from exploratory testing
11. Create a BasePage and put there all common methods
12. Each test must be independent with it own 'beforeEach'

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

After generating the scripts, run all the tests to verify they pass.

### Expected Output:

- Test suite files created in tests/feat-002/ based on test plan scenarios
- Scripts using robust selectors discovered during exploratory testing
- All scripts follow Playwright best practices
- Initial test generation complete
