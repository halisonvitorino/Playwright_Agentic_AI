// Configuration for Playwright tests
const config = {
  baseURL: "https://bugbank.netlify.app/",
  timeout: {
    action: 5000,
    navigation: 5000,
    assertion: 5000,
  },
  // Browser options
  browser: {
    headless: false, // Set to true for headless mode, false for debugging
    // Set to false for debugging
  },
  // Test metadata
  projectName: "Playwright_Agentic_AI",
  testSuite: "feat-001 Registration Flow",
};

module.exports = { config };
