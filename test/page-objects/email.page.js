import { Page } from 'page-objects/page'

class EmailPage extends Page {
  get enterEmail() {
    return $('input[type="email"]')
  }

  get submitButton() {
    return $('#submit')
  }
}

export default new EmailPage()
