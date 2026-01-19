import { Page } from '~/test/page-objects/page.js'
import { $, browser } from '@wdio/globals'

class SaveConfirmationPage extends Page {
  open() {
    return browser.url('/save-and-exit/e2e-form/confirmation/draft')
  }

  get confirmationPanelTitle() {
    return $(`aria/Your progress has been saved`)
  }

  get whatHappensNextHeading() {
    return $(`aria/What happens next`)
  }

  get closeWindowText() {
    return $(`aria/You can close this window.`)
  }
}

export default new SaveConfirmationPage()
