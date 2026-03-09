import allure from 'allure-commandline'
import { browser } from '@wdio/globals'

const debug = process.env.DEBUG
const oneMinute = 60 * 1000
const oneHour = 60 * 60 * 1000

export const config = {
  runner: 'local',

  baseUrl: process.env.ENVIRONMENT
    ? `https://forms-runner.${process.env.ENVIRONMENT}.cdp-int.defra.cloud`
    : 'http://localhost:3009',

  // Connection to remote chromedriver
  hostname: process.env.CHROMEDRIVER_URL || '127.0.0.1',
  port: process.env.CHROMEDRIVER_PORT || 4444,

  specs: ['./test/specs/**/*.a11y.js'],
  exclude: [],

  maxInstances: debug ? 1 : 3,

  capabilities: debug
    ? [{ browserName: 'chrome', 'wdio:enforceWebDriverClassic': true }]
    : [
        {
          maxInstances: 1,
          browserName: 'chrome',
          'wdio:enforceWebDriverClassic': true,
          'goog:chromeOptions': {
            args: [
              '--headless',
              '--no-sandbox',
              '--disable-infobars',
              '--disable-gpu',
              '--window-size=1920,1080'
            ]
          }
        }
      ],

  execArgv: debug ? ['--inspect'] : [],

  logLevel: debug ? 'debug' : 'info',

  // run all a11y specs even if some fail
  bail: 0,

  waitforTimeout: 10000,
  waitforInterval: 200,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: 'mocha',

  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results'
      }
    ]
  ],

  mochaOpts: {
    ui: 'bdd',
    timeout: debug ? oneHour : 60000,
    bail: false
  },

  /**
   * Takes a screenshot after each test for debugging and reporting.
   *
   * @param {object} test - The test object containing test details
   * @param {string} test.title - The title of the test
   * @param {string} test.fullTitle - The full title including describe blocks
   * @param {object} context - The Mocha test context
   * @param {object} result - The test result details
   * @param {Error|undefined} result.error - The error if the test failed
   * @param {*} result.result - The test result value
   * @param {number} result.duration - The test duration in ms
   * @param {boolean} result.passed - Whether the test passed
   * @param {object} result.retries - Retry information
   * @returns {Promise<void>}
   */
  afterTest: async function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    await browser.takeScreenshot()
  },
  /**
   * Generates and opens the Allure report after all tests complete.
   *
   * @param {number} exitCode - 0 for success, 1 for failure
   * @param {import('@wdio/types').Options.Testrunner} config - The resolved WDIO config
   * @param {import('@wdio/types').Capabilities[]} capabilities - The list of capabilities
   * @param {import('@wdio/types').Frameworks.TestResult[]} results - The test results
   * @returns {Promise<void>} Resolves when the report is generated and opened
   */
  onComplete: function (exitCode, config, capabilities, results) {
    const reportError = new Error('Could not generate Allure report')
    const generation = allure(['generate', 'allure-results', '--clean'])

    return new Promise((resolve, reject) => {
      const generationTimeout = setTimeout(() => reject(reportError), oneMinute)

      generation.on(
        'exit',
        /** @param {number} exitCode */ function (exitCode) {
          clearTimeout(generationTimeout)

          if (exitCode !== 0) {
            return reject(reportError)
          }

          if (!process.env.CI) {
            allure(['open'])
          }
          resolve()
        }
      )
    })
  }
}
