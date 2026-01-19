import { Page } from '~/test/page-objects/page.js'
import { $, browser } from '@wdio/globals'

class SaveYourProgressPage extends Page {
  open() {
    return browser.url('/save-and-exit/e2e-form/draft')
  }

  get mailBlock() {
    return $('//div[contains(@class, "govuk-grid-column-two-thirds")]')
  }

  get emailAddressField() {
    return $('aria/Your email address')
  }

  get confirmEmailAddressField() {
    return $('aria/Confirm your email address')
  }

  get securityQuestionMemorablePlace() {
    return $(`aria/What is a memorable place you have visited ? `)
  }

  get securityQuestionCharacterName() {
    return $(
      `aria/What is the name of your favourite character from a story or TV show ? `
    )
  }

  get securityQuestionAudioRecommendation() {
    return $(`aria/What album or song do you always recommend to others ? `)
  }

  get securityAnswerField() {
    return $(`aria/Your answer to the security question`)
  }

  get saveProgress() {
    return $('button=Save progress')
  }

  get cancelButton() {
    return $('aria/Cancel')
  }
}

export default new SaveYourProgressPage()
