import { config as baseConfig } from './wdio.conf.js'

export const config = {
  ...baseConfig,

  user: process.env.BROWSERSTACK_USER,
  key: process.env.BROWSERSTACK_KEY,

  commonCapabilities: {
    'bstack:options': {
      buildName: 'browserstack-build-1'
    }
  },

  capabilities: [
    {
      browserName: 'Chrome',
      'bstack:options': {
        browserVersion: 'latest',
        os: 'Windows',
        osVersion: '10'
      }
    }
  ],

  services: [
    [
      'browserstack',
      {
        testObservability: true,
        testObservabilityOptions: {
          user: process.env.BROWSERSTACK_USER,
          key: process.env.BROWSERSTACK_KEY,
          projectName: 'forms-smoke-test',
          buildName: 'browserstack-build-1'
        },
        acceptInsecureCerts: true,
        forceLocal: true,
        browserstackLocal: true
      }
    ]
  ]
}
