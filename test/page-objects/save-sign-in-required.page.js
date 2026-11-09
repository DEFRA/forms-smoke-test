import { Page } from '~/test/page-objects/page.js'
import { $ } from '@wdio/globals'

class SaveSignInRequiredPage extends Page {
  get signInButton() {
    return $('a.govuk-button=Sign in')
  }
}

export default new SaveSignInRequiredPage()
