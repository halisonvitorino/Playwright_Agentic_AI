# Playwright Agentic AI Automation Framework

A comprehensive test automation framework for web applications using Playwright with JavaScript, following best practices and incorporating AI-assisted workflows.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Test Reports](#test-reports)
- [Troubleshooting](#troubleshooting)
- [Extending the Framework](#extending-the-framework)
- [Best Practices](#best-practices)

## 🔍 Overview

This framework provides a complete solution for end-to-end testing of web applications using:
- **Playwright** for reliable cross-browser testing
- **Page Object Model (POM)** for maintainable test scripts
- **Behavior-Driven Development (BDD)** style test organization
- **Centralized test data management**
- **Custom utilities** for actions, assertions, and error handling
- **Comprehensive reporting** capabilities

The framework was built using an AI-assisted workflow that included:
1. User story analysis
2. Test plan creation
3. Exploratory testing
4. Test automation generation
5. Test execution and healing
6. Test reporting
7. Version control integration

## ✨ Features

- ✅ Cross-browser testing (Chromium, Firefox, WebKit)
- ✅ Page Object Model for encapsulating page interactions
- ✅ Data-driven testing with centralized test data
- ✅ Reusable action and assertion utilities
- ✅ Automatic handling of dynamic waits and timeouts
- ✅ Screenshot and video capture on failure
- ✅ Detailed HTML test reports
- ✅ Form validation testing
- ✅ Negative and edge case testing
- ✅ Selector scoping to avoid conflicts between similar forms
- ✅ Error message extraction utilities
- ✅ Configurable timeouts and environments

## 📋 Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (v14.0.0 or higher recommended)
- [Git](https://git-scm.com/)
- A code editor (VS Code recommended)

## 🔧 Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd Playwright_Agentic_AI
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright browsers** (first time only):
   ```bash
   npx playwright install
   ```

## ⚙️ Configuration

### Playwright Configuration (`playwright.config.js`)
```javascript
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://bugbank.netlify.app/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }
  ]
});
```

### Test Data (`utils/test-data.js`)
Centralized test data management including:
- Valid user registration data
- Invalid email formats
- Empty and whitespace-only field values
- Special character test cases
- Length validation data
- Password mismatch scenarios

### Environment Variables
You can override default settings using environment variables:
- `BASE_URL`: Change the application under test
- `HEADLESS`: Set to `false` for headed mode (`npm test` will show browsers)
- `DEBUG`: Set to `true` for verbose logging

## 📁 Project Structure

```
Playwright_Agentic_AI/
├── .github/                 # GitHub workflows and agents
│   ├── agents/              # AI agent definitions
│   └── workflows/           # CI/CD workflows
├── .vscode/                 # VS Code settings
├── node_modules/            # Dependencies
├── pages/                   # Page Object Models
│   ├── home-page.js         # Home page interactions
│   └── registration-page.js # Registration page interactions
├── test-results/            # Test reports and artifacts
│   ├── feat-001-test-report.md          # Manual test report
│   └── feat-001-tests-report.md         # Automated test execution report
├── test-plans/              # Test plan documentation
│   └── test-plan-feat-001.md            # Detailed test plan
├── tests/                   # Test files
│   └── test-plan-feat-001/              # Organized by test plan
│       ├── TC_001_happy_path.test.js
│       ├── TC_002_required_fields.test.js
│       ├── TC_003_invalid_email.test.js
│       ├── TC_004_spaces_only_field.test.js
│       ├── TC_005_special_chars_name.test.js
│       ├── TC_006_max_length.test.js
│       ├── TC_007_password_mismatch.test.js
│       └── TC_008_successful_registration.test.js
├── user-stories/            # User story documentation
│   └── feat-001.md          # Registration feature user story
├── utils/                   # Reusable utilities
│   ├── actions.js           # Action utilities (fill, click, etc.)
│   ├── assertions.js        # Custom assertion helpers
│   ├── config.js            # Test configuration
│   ├── getFieldError.js     # Field-specific error extraction
│   └── test-data.js         # Centralized test data
├── exploratory-screenshots/ # Screenshots from exploratory testing
├── screenshots/             # Screenshots from test execution
├── playwright-report/       # Latest Playwright HTML report
├── playwright.config.js     # Playwright configuration
├── package.json             # Project dependencies and scripts
├── README.md                # This file
└ └ prompt-execucao-testes.md  # Current workflow prompt
```

## ▶️ Running Tests

### Run all tests in headless mode (Chrome by default):
```bash
npm test
```

### Run tests in headed mode (to see the browser):
```bash
npm run test:headed
```

### Run specific test files:
```bash
npx playwright test tests/test-plan-feat-001/TC_001_happy_path.test.js
```

### Run tests for a specific browser:
```bash
npx playwright test --project=firefox
```

### Run tests with UI mode (for test authoring and debugging):
```bash
npm run test:ui
```

### Generate and view the latest HTML report:
```bash
npm run test:report
```

## 📊 Test Reports

The framework generates multiple types of reports:

1. **Playwright HTML Report** (default):
   - Automatically generated after test execution
   - View with: `npm run test:report`
   - Located in `playwright-report/` directory

2. **Custom Test Reports**:
   - Manual exploratory testing results: `test-results/feat-001-test-report.md`
   - Automated test execution results: `test-results/feat-001-tests-report.md`

3. **Artifacts**:
   - Screenshots: Saved on failure and during test steps
   - Videos: Recorded for failed tests
   - Trace files: Available for debugging (enabled in config)

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. "faker is not defined" Error
**Solution**: Ensure `@faker-js/faker` is installed and properly imported in `utils/test-data.js`:
```javascript
const { faker } = require('@faker-js/faker');
```

#### 2. Selector Conflicts (Strict Mode Violations)
**Solution**: Scope selectors to specific forms using:
```javascript
// Instead of:
page.locator('input[placeholder="Informe seu e-mail"]')

// Use:
page.locator('form:has(button:has-text("Cadastrar"))')
    .locator('input[placeholder="Informe seu e-mail"]')
```

#### 3. Test Timeout Errors
**Solution**: Increase timeouts in:
- Individual tests: `test.setTimeout(60000)`
- Playwright config: Adjust `timeout` and `expect.timeout`
- Add explicit waits for dynamic content

#### 4. Element Not Interactable
**Solution**: Ensure elements are visible and enabled before interaction:
```javascript
await element.waitFor({ state: 'visible', timeout: 5000 });
await element.click();
```

#### 5. Environment-Specific Issues (Firefox/WebKit)
**Solution**: 
- Use Chrome for primary testing (most stable)
- Add browser-specific waits or selectors if needed
- Consider skipping unstable tests on certain browsers

### Debugging Tips

1. **Run in headed mode** to see what's happening:
   ```bash
   npm run test:headed
   ```

2. **Use trace viewer** for detailed execution analysis:
   ```bash
   npx playwright show-trace trace.zip
   ```

3. **Add debug pauses** in your tests:
   ```javascript
   await page.pause(); // Opens Playwright Inspector
   ```

4. **Check console errors** in the browser during execution.

## 🔧 Extending the Framework

### Adding New Page Objects
1. Create a new file in `pages/` (e.g., `dashboard-page.js`)
2. Follow the existing pattern:
   ```javascript
   class DashboardPage {
     constructor(page) {
       this.page = page;
       // Define selectors and methods
     }
     // Page-specific methods
   }
   module.exports = { DashboardPage };
   ```

### Adding New Test Cases
1. Create a new test file in the appropriate test plan directory
2. Follow the naming convention: `TC_XXX_description.test.js`
3. Use the Page Objects and test data utilities
4. Include proper `test.describe()` and `test` blocks

### Adding New Utilities
1. Create a new file in `utils/` (e.g., `api-utils.js`)
2. Export functions for reuse:
   ```javascript
   // utils/api-utils.js
   const apiUtils = {
     makeRequest: (options) => { /* implementation */ },
     validateResponse: (response) => { /* implementation */ }
   };
   module.exports = { apiUtils };
   ```

### Customizing Test Data
1. Modify `utils/test-data.js` to add new data sets
2. Use functions for dynamic data generation
3. Keep sensitive data out of source control (use environment variables)

## 🏆 Best Practices Followed

### Test Design
- **Independent Tests**: Each test sets up its own preconditions
- **Atomic Tests**: Focus on one functionality per test
- **Clear Naming**: Descriptive test names following BDD style
- **Minimal Assertions**: One clear verification per test when possible
- **Positive and Negative Coverage**: Both valid and invalid scenarios

### Code Quality
- **Page Object Model**: Encapsulates UI interactions
- **DRY Principle**: Reusable utilities and methods
- **Consistent Formatting**: Standard JavaScript style
- **Proper Error Handling**: Graceful failure with meaningful messages
- **Comments**: Clear explanations for complex logic

### Maintenance
- **Centralized Configuration**: Easy environment switching
- **Data Separation**: Test data separate from test logic
- **Selector Management**: Stable, unique selectors preferred
- **Regular Updates**: Dependencies kept current
- **Documentation**: Inline comments and external docs

### Reporting
- **Detailed Logs**: Clear pass/fail reasons
- **Visual Evidence**: Screenshots and videos for failures
- **Historical Tracking**: Reports stored for trend analysis
- **Actionable Information**: Defects include steps to reproduce

## 📞 Support and Contribution

For issues, questions, or contributions:
1. Check the existing documentation and test comments
2. Review the exploratory testing results for insights
3. Examine the test reports for patterns and trends
4. Submit pull requests following the existing code style

## 📄 License

This project is provided as-is for educational and demonstration purposes. 
Please refer to any existing license files in the repository or contact the maintainer for licensing information.

---

*Last updated: September 10, 2026*  
*Framework version: 1.0.0*  
*Built with Playwright v1.63.0 and Node.js v20.11.0*

Happy testing! 🧪