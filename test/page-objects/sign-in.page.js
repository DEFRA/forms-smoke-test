import { Page } from '~/test/page-objects/page.js'
import { $ } from '@wdio/globals'

class SignInPage extends Page {
  get emailField() {
    return $('aria/Enter your email address')
  }

  get securityCodeField() {
    return $('aria/Enter the 6 digit security code')
  }

  get phoneField() {
    return $('aria/Mobile phone number')
  }

  get continueButton() {
    return $('aria/Continue')
  }

  /**
   * The sign-in step that the browser is on, found from the field that the
   * page shows
   * @returns {Promise<'email' | 'security code' | 'phone' | undefined>} the step, or undefined when the page is not a sign-in step
   */
  async step() {
    if (await this.emailField.isDisplayed()) {
      return 'email'
    }

    if (await this.securityCodeField.isDisplayed()) {
      return 'security code'
    }

    if (await this.phoneField.isDisplayed()) {
      return 'phone'
    }

    return undefined
  }
}

export default new SignInPage()
