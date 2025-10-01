import { Page } from '~/test/page-objects/page.js'
import { $, browser } from '@wdio/globals'

class NamePage extends Page {
  open() {
    return browser.url('/form/preview/draft/e2e-form/whats-your-name')
  }

  get enterName() {
    return $(`aria/What's your name?`)
  }

  get submitButton() {
    return $('aria/Continue')
  }

  get saveAndExit() {
    return $('aria/Save and exit')
  }
}

export default new NamePage()
