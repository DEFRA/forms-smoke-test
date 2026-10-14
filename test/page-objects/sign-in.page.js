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
}

export default new SignInPage()
