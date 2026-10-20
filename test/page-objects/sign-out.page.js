import { Page } from '~/test/page-objects/page.js'
import { $ } from '@wdio/globals'

class SignOutPage extends Page {
  get signOutButton() {
    return $('button=Sign out')
  }
}

export default new SignOutPage()
