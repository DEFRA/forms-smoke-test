import { Page } from './page.js'

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