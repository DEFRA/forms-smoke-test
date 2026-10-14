import { browser, $ } from '@wdio/globals'

class Page {
  /**
   * The URL of forms-runner, from the baseUrl of the WebdriverIO config
   */
  get baseUrl() {
    if (!browser.options.baseUrl) {
      throw new Error('baseUrl is not set')
    }

    return browser.options.baseUrl
  }

  get pageHeading() {
    return $('h1')
  }

  open(path) {
    return browser.url(path)
  }
}

export { Page }
