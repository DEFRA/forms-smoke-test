import { Page } from '~/test/page-objects/page.js'
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
