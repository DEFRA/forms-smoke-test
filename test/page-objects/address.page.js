import { Page } from '~/test/page-objects/page.js'
import { $ } from '@wdio/globals'

class AddressPage extends Page {
  get enterAddressLine1() {
    return $('aria/Address line 1')
  }

  get enterTown() {
    return $('aria/Town or city')
  }

  get enterPostcode() {
    return $('aria/Postcode')
  }

  get submitButton() {
    return $('aria/Continue')
  }
}

export default new AddressPage()
