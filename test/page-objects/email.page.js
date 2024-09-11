import { Page } from './page.js'
import { $ } from '@wdio/globals'

class EmailPage extends Page {
  get enterEmail() {
    return $(`aria/What's your email address?`)
  }

  get submitButton() {
    return $('aria/Continue')
  }
}

export default new EmailPage()
