import { Page } from '~/test/page-objects/page.js'
import { $ } from '@wdio/globals'

class SummaryPage extends Page {
  /**
   * @param {string} slug - the slug of the form
   */
  open(slug) {
    return super.open(`/form/preview/draft/${slug}/summary`)
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
    return $(`dt.govuk-summary-list__key=${question}`)
      .parentElement()
      .$('.govuk-summary-list__value')
  }
}

export default new SummaryPage()
