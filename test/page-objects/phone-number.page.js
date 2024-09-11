import { Page } from './page.js'
import { $ } from '@wdio/globals'

class PhoneNumberPage extends Page {
  get enterPhoneNumber() {
    return $(`aria/What's your phone number?`)
  }

  get submitButton() {
    return $('aria/Continue')
  }
}

export default new PhoneNumberPage()
