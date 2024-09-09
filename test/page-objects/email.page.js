import { Page } from './page.js'

class EmailPage extends Page {
  get enterEmail() {
    return $(`aria/What's your email address?`)
  }

  get submitButton() {
    return $('aria/Continue')
  }
}

export default new EmailPage()
