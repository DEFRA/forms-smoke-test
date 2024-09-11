import { Page } from './page.js'
import { $ } from '@wdio/globals'

class NamePage extends Page {
  get enterName() {
    return $(`aria/What's your name?`)
  }

  get submitButton() {
    return $('aria/Continue')
  }
}

export default new NamePage()
