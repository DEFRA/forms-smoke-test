import { config as baseConfig } from './wdio.conf.js'

export const config = {
  ...baseConfig,

  hostname: 'hub.browserstack.com',
  port: 443,
  protocol: 'https',

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
    },
    {
      "browserName" : "Safari",
      'bstack:options' : {
        "os" : "OS X",
        "osVersion" : "Mojave",
        "browserVersion" : "12.1"
      }
     }, 
     {
      "browserName" : "Safari",
      'bstack:options' : {
        "os" : "OS X",
        "osVersion" : "Sequoia",
        "browserVersion" : "18.1"
     }
   },    
     {
      "browserName" : "Edge",
      'bstack:options' : {
        "os" : "Windows",
        "osVersion" : "11",
        "browserVersion" : "latest"
     }
   },
   {
    "browserName" : "Edge",
    'bstack:options' : {
      "os" : "Windows",
      "osVersion" : "10",
      "browserVersion" : "110.0"
    }
  },
  {
    "browserName" : "Firefox",
    'bstack:options' : {
      "os" : "Windows",
      "osVersion" : "10",
      "browserVersion" : "132.0"
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
          buildName: 'Forms Smoke test with main browsers'
        },
        acceptInsecureCerts: true,
        forceLocal: true,
        browserstackLocal: true
      }
    ]
  ]
}
