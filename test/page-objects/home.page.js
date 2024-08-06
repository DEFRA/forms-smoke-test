import { Page } from 'page-objects/page'

class HomePage extends Page {
  open() {
    return super.open('preview/draft/form-a1/page-one')
  }
}

export default new HomePage()
