## 🔧 STEP 1: Execute and Heal Automation Tests

### Prompt:

Now execute all the generated automation scripts and heal any failures using the playwright-test-healer agent.

1. Run all automation scripts in: tests/feat-001-tests/
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
- Healed test scripts updated in tests/feat-001-tests/
- Final stable test execution results
- Summary of healing activities performed

## 📊 STEP 2: Create Test Report

### Prompt:

Now create a comprehensive test execution report based on manual testing, automation execution, and healing activities.

Please compile results from:

- Generated automation scripts in tests/feat-001-tests/
- Automated test execution and healing results

Structure the report as: test-results/feat-001-tests-report.md

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
