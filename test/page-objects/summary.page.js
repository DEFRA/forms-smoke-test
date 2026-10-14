import { Page } from '~/test/page-objects/page.js'
import { $, browser } from '@wdio/globals'

class SummaryPage extends Page {
  openV2() {
    return browser.url('/form/preview/draft/e2e-form-v2/summary')
  }

  get summary() {
    return $('aria/Summary')
  }

  get contactDetails() {
    return $('aria/Contact details')
  }

  get summaryList() {
    return $('.govuk-summary-list')
  }

  get submitButton() {
    return $('aria/Submit')
  }

  get saveAndExit() {
    return $('button=Save and exit')
  }

  /**
   * @param {string} question - the text of the summary list key
   */
  answer(question) {
    return $(`//dt[normalize-space()="${question}"]/following-sibling::dd[1]`)
  }
}

export default new SummaryPage()
