function createRegistrationData(overrides = {}) {
  const runId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  return {
    email: `qa.feat001.${runId}@example.com`,
    name: "Maria Silva",
    password: "Test@1234",
    confirmation: "Test@1234",
    ...overrides,
  };
}

module.exports = { createRegistrationData };
