import { Page } from '~/test/page-objects/page.js'
import { $ } from '@wdio/globals'

class UnicornsTextPage extends Page {
  get enterWhereYouKeepUnicorn() {
    return $('aria/Where will you keep the unicorns?')
  }

  get submitButton() {
    return $('aria/Continue')
  }
}

export default new UnicornsTextPage()
