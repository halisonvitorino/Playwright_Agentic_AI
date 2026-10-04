# 🎯 STEP 2: Create Test Plan

## Prompt:

Based on the user story that you just reviewed on Step 1, use the playwright-test-planner agent located at .github\agents to:

1. Read the application URL and test credentials from the user story
2. Explore the application and understand all workflows mentioned in the acceptance criteria
3. Create a comprehensive test plan that covers all acceptance criteria including:
   - Happy path scenarios
   - Negative scenarios (validation errors, empty fields, invalid data, etc.)
   - Edge cases and boundary conditions
   - Navigation flow tests
   - UI element validation
4. Save the test plan as: test-plans/test-plan-feat-001.md

### Expected Output:

- Clear test case title
- Detailed step-by-step instructions using BDD and Gherkin
- Expected results for each step
- Test data requirements
- A complete test plan markdown file saved to test-plans/
- Organized test scenarios with clear structure
