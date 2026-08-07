import { Page } from '~/test/page-objects/page.js'
import { $, browser } from '@wdio/globals'

class UploadFilePage extends Page {
  get chooseFile() {
    // Force hidden file input element to be visible so that wdio can interact with it
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    browser.execute(() => {
      const elements = document.getElementsByName('file')
      if (elements.length) {
        elements[0].style.display = 'block'
      }
    })

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
