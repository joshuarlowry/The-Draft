module.exports = {
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:8082/The-Draft/',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run build && npx eleventy --serve --port 8082',
    url: 'http://localhost:8082/The-Draft/',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
};
