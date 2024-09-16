import { Page } from '~/test/page-objects/page.js'
import { $ } from '@wdio/globals'

class SummaryPage extends Page {
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
    return $('aria/Send')
  }
}

export default new SummaryPage()
