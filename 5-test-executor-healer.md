# 🔧 STEP 5: Execute and Heal Automation Tests

## Prompt:

Execute all the generated tests automation scripts and heal any failures using the playwright-test-healer agent located at .github\agents to:

1. Run all automation scripts in: tests/
2. Identify any failing tests
3. For each failing test, use the playwright-test-healer agent located at .github\agents to:
   - Analyze the failure (selector issues, timing issues, assertion failures)
   - Auto-heal the test by fixing selectors, adding waits, or adjusting assertions
   - Update the test script with the fixes
4. Re-run the healed tests to verify they pass
5. Repeat the heal process until all tests are stable and passing
6. Invoke the /ecc:learn to extract problem patterns and the used fix during the session (fixes implemented, workarounds discovered, debugging techniques that worked)
7. Document:
   - Initial test results (pass/fail count)
   - Healing activities performed
   - Final test results after healing
   - Any tests that couldn't be auto-healed

### Expected Output:

- All automation tests executed
- Failing tests identified and healed using test-healer agent
- Healed test scripts updated in tests/feat-002
- Final stable test execution results
- Summary of healing activities performed
