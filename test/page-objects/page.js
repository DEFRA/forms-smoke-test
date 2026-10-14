import { browser, $ } from '@wdio/globals'

const { RUNNER_URL } = process.env

class Page {
  /**
   * The URL of forms-runner
   */
  get runnerUrl() {
    if (!RUNNER_URL) {
      throw new Error('RUNNER_URL is not set')
    }

    return RUNNER_URL
  }

  get pageHeading() {
    return $('h1')
  }

  open(path) {
    return browser.url(path)
  }
}

export { Page }
