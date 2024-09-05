import { Page } from 'page-objects/page'

class LibraryPage extends Page {
  open() {
    return super.open('/library')
  }

  getCreateNewFormButton() {
    return $('button=Create new form')
  }

  getFormTitleInput() {
    return $('a[href="/library"]')
  }
}

export default new LibraryPage()
