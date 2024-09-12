import { Page } from '~/test/page-objects/page.js'
import { $ } from '@wdio/globals'

class SelectNoOfUnicornsPage extends Page {
  get select1to5() {
    return $('aria/1 to 5')
  }

  get select6to10() {
    return $('aria/6 to 10')
  }

  get select11orMore() {
    return $('aria/11 or more')
  }

  get submitButton() {
    return $('aria/Continue')
  }
}

export default new SelectNoOfUnicornsPage()
