const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    reporter: "mochawesome",
    reporterOptions:{
      reporterDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: false
    },
    specPattern: "cypress/e2e/**/*.js",
  },
});
