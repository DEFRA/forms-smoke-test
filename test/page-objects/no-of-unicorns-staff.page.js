import { Page } from '~/test/page-objects/page.js'
import { $ } from '@wdio/globals'

class NoOfUnicornsStaffPage extends Page {
  get enterNoOfUnicornStaff() {
    return $('aria/How many members of staff will look after the unicorns?')
  }

  get submitButton() {
    return $('aria/Continue')
  }
}

export default new NoOfUnicornsStaffPage()
