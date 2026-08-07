import { Page } from '~/test/page-objects/page.js'
import { $ } from '@wdio/globals'

class UploadFilePage extends Page {
  get chooseFile() {
    // Force hidden file input element to be visible so that wdio can interact with it
    document.getElementsByName('file')[0].style.display = 'block'
    return $('input[type="file"]')
  }

  get fileHolder() {
    return $('//body/div/main/div/div/form[1]/div/div[2]/input')
  }

  get checkForUploadedFile() {
    return $('aria/Uploaded')
  }

  get submitButton() {
    return $('aria/Continue')
  }
}

export default new UploadFilePage()
