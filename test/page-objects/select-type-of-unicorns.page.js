import { Page } from '~/test/page-objects/page.js'
import { $ } from '@wdio/globals'

class SelectTypeOfUnicornsPage extends Page {
  get selectFlying() {
    return $('aria/Flying')
  }

  get selectAquatic() {
    return $('aria/Aquatic')
  }

  get submitButton() {
    return $('aria/Continue')
  }
}

export default new SelectTypeOfUnicornsPage()
