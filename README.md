# SauceDemo Cypress Tests

This project contains automated end-to-end tests for [SauceDemo](https://www.saucedemo.com), a sample online shop. The tests use Cypress to check the main shopping journey and common error cases.

## What the tests cover

- Signing in, invalid credentials, and locked-out users
- Product listings, sorting, and product details
- Adding and removing products in the cart
- Checkout information, validation, and order summary
- Logging out and other application behavior

## Getting started

You’ll need [Node.js](https://nodejs.org/) and npm installed.

1. Clone this repository and open its folder in a terminal.
2. Install the project dependencies:

   ```bash
   npm install
   ```

3. Install Cypress as a development dependency. It is used by this project but is not currently listed in `package.json`:

   ```bash
   npm install --save-dev cypress
   ```

4. Open the Cypress test runner:

   ```bash
   npx cypress open
   ```

   Choose **E2E Testing**, then select a browser and a test file under `cypress/e2e`.

To run tests in headless mode from the terminal:

```bash
npx cypress run
```

The tests use the public SauceDemo site at `https://www.saucedemo.com`. Test usernames and the shared valid password are stored in `cypress/fixtures/testData.json`.

## Project structure

```text
cypress/
  e2e/         End-to-end test files
  fixtures/    Test data
  pageObject/  Page object helpers used by the tests
  support/     Cypress support files and custom commands
cypress.config.js
```

Some test files currently contain `it.only`, which makes Cypress run only the focused test in that file. Remove `.only` from those tests when you want the other tests in the same file to run as well.


Also you can view test-reports in the mochawesome-report if you've run tests in headless mode.