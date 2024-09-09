import { Page } from 'page-objects/page'

class PhoneNumberPage extends Page {
  get enterPhoneNumber() {
    return $('input[type="tel"]')
  }

  get submitButton() {
    return $('#submit')
  }
}

export default new PhoneNumberPage()
