# Magento Commerce Automation with Playwright & TypeScript

This repository contains automated tests for Magento e-commerce platform, implementing best practices in test automation while transitioning from manual to automated testing.

> ⚠️ This project is currently under development and may be expanded over time. New features, tests, and improvements will be added as I continue to develop it in my spare time.

As a manual QA engineer transitioning to test automation, I've built this framework to:
- Learn modern test automation tools
- Implement best practices in test automation
- Create maintainable and scalable tests for Magento e-commerce platform

**Test Site:** https://magento.softwaretestingboard.com

## Tech Stack

- **Language**: TypeScript
- **Framework**: Playwright
- **Pattern**: Page Object Model (POM)
- **Reporting**: Built-in Playwright reports
- **Environment Management**: Dotenv

## Project Structure
- `fixtures/` — Test data fixtures
- `helpers/` — Utility functions
    - `interfaces/` — TypeScript interfaces
- `pageObjects/` — Page Object classes
    - `app/` — Page Object fixtures
    - `pages/` — Page Objects
        - `components/` — Page Objects components
- `tests/` — Test suites
    - `.authSetup/` — User login for storage state
    - `api/` — API tests
    - `e2e/` — End-to-end scenarios
    - `ui/` — UI interaction tests
- `.env` — Environment config
- `.env.example` — Environment template
- `playwright.config.ts` — Test runner config
- `package.json` — Dependencies

## Installation
1. Clone repository:
    ```bash
    git clone https://github.com/YevhenTarasenko/playwright-pet-magento-softwaretestingboard.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Configure environment:
    - Edit `.env` file with your test credentials (see `.env.example` for reference)

## How to run on local machine
1. All tests:
    ```bash
    npx playwright test
    ```
2. Open report:
    ```bash
    npx playwright show-report
    ```

## Future Enhancements
- Adding end-to-end scenarios
- Expanding API test coverage
- Integrating with CI/CD pipelines
- Adding Docker support for test execution