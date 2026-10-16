import { FormPage } from '~/test/page-objects/form.page.js'
import { $ } from '@wdio/globals'

class SummaryPage extends FormPage {
  suffix = '/summary'

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

  /**
   * @param {string} question - the text of the summary list key
   */
  answer(question) {
    return $(`dt.govuk-summary-list__key=${question}`)
      .parentElement()
      .$('.govuk-summary-list__value')
  }
}

export const summaryV2Page = new SummaryPage({
  slug: 'e2e-form-v2',
  state: 'draft'
})

export default new SummaryPage({ slug: 'e2e-form', state: 'draft' })
