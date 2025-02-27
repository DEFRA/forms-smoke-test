import { Page } from '~/test/page-objects/page.js'
import { $ } from '@wdio/globals'

class UploadFilePage extends Page {
  get chooseFile() {
    return $('input[type="file"]')
  }

  get uploadFile() {
    return $('aria/Upload file')
  }

  get checkForUploadedFile() {
    return $('aria/Uploaded')
  }

  get submitButton() {
    return $('aria/Continue')
  }
}

export default new UploadFilePage()
