import { Page } from '~/test/page-objects/page.js'
import { $ } from '@wdio/globals'

class SignedOutPage extends Page {
  path = '/auth/signed-out'

  get signInAgainLink() {
    return $('=sign in again')
  }
}

export default new SignedOutPage()
