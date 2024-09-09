import { Page } from './page.js'

class AddressPage extends Page {
  get enterAddressLine1() {
    return $('aria/Address Line 1')
  }

  get submitButton() {
    return $('button[type="Submit"]')
  }
}

export default new AddressPage()
