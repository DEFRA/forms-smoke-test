import { Page } from './page.js'

class HomePage extends Page {
  open() {
    return super.open('/preview/draft/do-not-use-used-for-automated-tests')
  }
}

export default new HomePage()
