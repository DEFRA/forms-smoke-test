import { Page } from 'page-objects/page'

class NamePage extends Page {
  get enterName() {
    return $('#textField')
  }

  get submitButton() {
    return $('#submit')
  }
}

export default new NamePage()
