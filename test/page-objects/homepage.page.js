import { Page } from '~/test/page-objects/page.js'
import { $ } from '@wdio/globals'

class HomepagePage extends Page {
  path = '/homepage/preview/draft/e2e-form'

  open() {
    return super.open(this.path)
  }

  get signOutLink() {
    return $('=Sign out')
  }
}

export default new HomepagePage()
