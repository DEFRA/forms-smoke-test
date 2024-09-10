import { Page } from './page.js'

class UnicornsTextPage extends Page {
  get enterWhereYouKeepUnicorn() {
    return $('aria/Where will you keep the unicorns?')
  }

  get submitButton() {
    return $('aria/Continue')
  }
}

export default new UnicornsTextPage()
