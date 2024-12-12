import { Page } from '~/test/page-objects/page.js'
import { $ } from '@wdio/globals'

class EmailPage extends Page {
  get enterEmail() {
    return $(`aria/What's your email address?`)
  }

  get submitButton() {
    return $('aria/Continue')
  }

  get emailInvalidErrorMessage(){
    return $('aria/Enter email adress in the correct format')
  }

  get emailHintText(){
    return $('aria/This is an email address. An email address must contain an at sign @')
  }
}

export default new EmailPage()
