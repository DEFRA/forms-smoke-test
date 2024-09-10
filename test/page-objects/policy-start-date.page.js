import { Page } from './page.js'

class PolicyStartDatePage extends Page {
  get enterDay() {
    return $(`aria/Day`)
  }

  get enterMonth() {
    return $(`aria/Month`)
  }

  get enterYear() {
    return $(`aria/Year`)
  }

  get submitButton() {
    return $('aria/Continue')
  }
}

export default new PolicyStartDatePage()
