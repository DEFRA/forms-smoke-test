import { Page } from '~/test/page-objects/page.js'
import { $, $$ } from '@wdio/globals'

class HomepagePage extends Page {
  path = '/homepage/preview/draft/e2e-form'

  open() {
    return super.open(this.path)
  }

  openV2() {
    return super.open('/homepage/preview/draft/e2e-form-v2')
  }

  get signOutLink() {
    return $('=Sign out')
  }

  // Each saved form that the person can resume has one of these links. The
  // link text also has hidden text, so the match is on the start of the text.
  get continueLinks() {
    return $$('//table//a[starts-with(normalize-space(), "Continue")]')
  }
}

export default new HomepagePage()
