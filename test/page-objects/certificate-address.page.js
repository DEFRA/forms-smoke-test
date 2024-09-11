import { Page } from './page.js'
import { $ } from '@wdio/globals'

class CertificateAddressPage extends Page {
  get selectYesOrNo() {
    return $('aria/Yes')
  }

  get submitButton() {
    return $('aria/Continue')
  }
}

export default new CertificateAddressPage()
