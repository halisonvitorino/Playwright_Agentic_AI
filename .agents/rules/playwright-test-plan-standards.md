# Playwright Test Plan Standards

Whenever you are tasked with creating or modifying a Playwright Test Plan for this project, you MUST adhere to the following standards:

1. **Use the Reference Template:** Before generating any test plan, you MUST read `test-plans/test-plan-feat-001.md` to understand the exact structure and formatting expected.
2. **Required Sections:** Your test plan MUST include the following sections:
   - `## Application Overview`
   - `## Test Data` (tabular format)
   - `## Test Scenarios`
   - `## Summary` (tabular mapping of scenarios to Acceptance Criteria)
   - `## File Structure` (tree format)
   - `## Technical Notes`
3. **Scenario Formatting:** Each scenario under `## Test Scenarios` MUST include:
   - A descriptive title mapped to Acceptance Criteria (e.g., `(AC1, AC2)`).
   - The corresponding spec file path.
   - Numbered **Steps** using Gherkin syntax (`Given`, `When`, `Then`).
   - Explicit `- expect:` blocks under every step detailing the exact expected outcome.
4. **Localization:** Match the language of the Application UI. For this project, expect UI elements, error messages, and button text to be in **Portuguese** (e.g., "Registrar", "Acessar", "É campo obrigatório"). Record expected messages exactly as they appear in the UI.
5. **Independence:** Explicitly state in the plan that every test must run in a fresh, unauthenticated browser context, and note any setup preconditions (like seeding a user).
