import { Page } from '~/test/page-objects/page.js'
import { $ } from '@wdio/globals'

const { IDENTITY_UI_URL } = process.env

class SignInPage extends Page {
  /**
   * The URL of forms-identity-ui, where forms-runner sends a person to sign in
   */
  get url() {
    if (!IDENTITY_UI_URL) {
      throw new Error('IDENTITY_UI_URL is not set')
    }

    return IDENTITY_UI_URL
  }

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
}

export default new SignInPage()
