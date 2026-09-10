# End-to-End QA Workflow With Natural Language

## Workflow Overview

This prompt guides you through a complete 7-step QA workflow using MCP servers and AI agents to go from user story to committed automated test scripts.

## 🎯 STEP 1: Read User Story

### Prompt:

Context: You are an expert in test automation using Playwright with javascript.

I need you to start a testing workflow.
So first, read the user story from the file: user-stories/feat-001.md
Summarize the key requirements, acceptance criteria and testing scope.

### Expected Output:

- Summary of the user story
- List of acceptance criteria
- Application URL and test credentials
- Key features to test

## 🎯 STEP 2: Create Test Plan

### Prompt:

Based on the user story [feat-001.md] that we just reviewed, use the playwright-test-planner agent to:

1. Read the application URL and test credentials from the user story
2. Explore the application and understand all workflows mentioned in the acceptance criteria
3. Create a comprehensive test plan that covers all acceptance criteria including:
   - Happy path scenarios
   - Negative scenarios (validation errors, empty fields, invalid data, etc.)
   - Edge cases and boundary conditions
   - Navigation flow tests
   - UI element validation
4. Save the test plan as: test-plans/[test-plan-feat-001.md]

Ensure each test scenario includes:

- Clear test case title
- Detailed step-by-step instructions using BDD and Gherkin
- Expected results for each step
- Test data requirements

### Expected Output:

- Complete test plan markdown file saved to test-plans/
- Organized test scenarios with clear structure
- Browser exploration screenshots (if needed)

## 🧪 STEP 3: Perform Exploratory Testing

### Prompt:

Now I need to perform manual exploratory testing using Playwright MCP browser tools.
Read the test plan from: test-plans/[test-plan-feat-001.md]

Then execute the test scenarios defined in that test plan:

1. Use Playwright browser tools to manually execute each test scenario from the test plan
2. Follow the step-by-step instructions in each test case
3. Verify expected results match actual results
4. Take screenshots at error states occurs
5. Document your findings:
   - Test execution results for each scenario
   - Any UI inconsistencies or unexpected behaviors
   - Missing validations or bugs discovered
   - Screenshots and videos as evidence

### Expected Output:

- Manual test execution results
- Screenshots of the application at various states
- List of observations and findings
- Any issues discovered during exploration

## ⚙️ STEP 4: Generate Automation Scripts

### Prompt:

Now create automated test scripts using the playwright-test-generator agent.

Review:

1. Test plan from: test-plans/[test-plan-feat-001.md] (for test scenarios and steps)
2. Exploratory testing results from Step 3 (for actual element selectors and UI insights)

Using insights from the manual exploratory testing:

- Leverage the element selectors and locators that were successfully used in Step 3
- Use stable element properties (IDs, data attributes, roles) discovered during exploration
- Apply wait strategies and UI behaviors observed during manual testing
- Incorporate any workarounds for UI quirks discovered

Generate Playwright JavaScript automation scripts:

1. Use the page Object approach
2. Organize the actions for use on scripts into appropriate files named actions.js in: utils/
3. Organize the assertions for use on scripts into appropriate files named assertions.js in: utils/
4. Organize the configs for use on scripts (if needed) into appropriate files named config.js in: utils/
5. Organize the dinamic test data for use on scripts into appropriate files named test-data.js in: utils/
6. Organize the page data/behavior for use on scripts into appropriate files named feat-001-page.js in: pages/
7. Create scripts for each test scenario from the test plan
8. Organize scripts into appropriate test suite files in: tests/test-plan-feat-001/
9. Use the test case names and steps from the test plan
10. Use reliable selectors and strategies from exploratory testing

Requirements for all scripts:

- Use JavaScript when creating test scripts
- Implement retry logic for dynamic elements
- Follow Playwright best practices
- Include proper assertions using expect()
- Use descriptive test names matching the format in the test plan
- Use robust element selectors discovered during manual testing
- Add comments for complex steps
- Use proper wait strategies based on actual application behavior
- Add proper test hooks (beforeEach, afterEach)
- Configure for browsers (Chrome)

After generating the scripts, run all the tests to verify they pass.

### Expected Output:

- Test suite files created in tests/feat-001/ based on test plan scenarios
- Scripts using robust selectors discovered during exploratory testing
- All scripts follow Playwright best practices
- Initial test generation complete

## 🔧 STEP 5: Execute and Heal Automation Tests

### Prompt:

Now execute all the generated automation scripts and heal any failures using the playwright-test-healer agent.

1. Run all automation scripts in: tests/feat-001/
2. Identify any failing tests
3. For each failing test, use the playwright-test-healer agent to:
   - Analyze the failure (selector issues, timing issues, assertion failures)
   - Auto-heal the test by fixing selectors, adding waits, or adjusting assertions
   - Update the test script with the fixes
4. Re-run the healed tests to verify they pass
5. Repeat the heal process until all tests are stable and passing
6. Document:
   - Initial test results (pass/fail count)
   - Healing activities performed
   - Final test results after healing
   - Any tests that couldn't be auto-healed

### Expected Output:

- All automation tests executed
- Failing tests identified and healed using test-healer agent
- Healed test scripts updated in tests/feat-001/
- Final stable test execution results
- Summary of healing activities performed

## 📊 STEP 6: Create Test Report

### Prompt:

Now create a comprehensive test execution report based on manual testing, automation execution, and healing activities.

Please compile results from:

- Step 3: Manual exploratory testing results
- Step 4: Generated automation scripts
- Step 5: Automated test execution and healing results

Structure the report as: test-results/feat-001-test-report.md

Include:

1. Executive Summary
   - Total test cases planned
   - Test cases executed
   - Overall Pass/Fail/Blocked status

2. Manual Test Results
   - Results from Step 3 exploratory testing
   - Screenshots and observations
   - Issues found during manual testing

3. Automated Test Results
   - Initial automation results from Step 5
   - Healing activities performed
   - Final test execution results after healing
   - Test suite execution summary
   - Pass/Fail count for each test suite

4. Defects Log
   - For any failed tests (manual or automated):
   - Bug ID
   - Severity (Critical/High/Medium/Low)
   - Title and Description
   - Steps to Reproduce in BDD format
   - Expected vs Actual Behavior
   - Screenshots/Evidence
   - Environment Details

5. Test Coverage Analysis
   - Which acceptance criteria are covered
   - Coverage from manual vs automated tests
   - Any gaps in test coverage
   - Recommendations for additional testing

6. Summary and Recommendations
   - Overall quality assessment
   - Risk areas
   - Next steps

### Expected Output:

- Comprehensive test execution report covering both manual and automated testing
- Clear PASS/FAIL status for all test scenarios
- Detailed bug reports for failures
- Complete test coverage analysis
- Evidence and screenshots attached

## 🚀 STEP 7: Commit to Git Repository

**Git Repository URL:** `https:github.com/halisonvitorino/FullAutomationAIFramework`

### Prompt:

Now commit all the test artifacts to the Git repository using the GitHub MCP server.

Git Repository URL: https:github.com/halisonvitorino/FullAutomationAIFramework

Please perform the following Git operations:

1. Initialize Git repository if not already initialized
2. Stage all files in the workspace (all new and modified files) if not already staged
3. Create a commit with the message:
   "feat(tests): Add complete test suite for Jira_Task-001 checkout workflow

- Add user story documentation
- Add comprehensive test plan with all scenarios
- Add test execution report with results
- Add automated test scripts for checkout process
- Include validation, navigation, and edge case tests

Resolves Jira_Task-001"

4. Push all changes to the Git repository
5. Provide a summary of what was committed

### Expected Output:

- All workspace files committed to Git
- Descriptive commit message following conventional commit format
- Confirmation of successful push to the provided repository
- Summary of changes
