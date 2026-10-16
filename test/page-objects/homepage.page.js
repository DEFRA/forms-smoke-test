import { FormPage } from '~/test/page-objects/form.page.js'
import { $, $$ } from '@wdio/globals'

class HomepagePage extends FormPage {
  prefix = '/homepage'

  get signOutLink() {
    return $('=Sign out')
  }

  // Each saved form that the person can resume has one of these links. The
  // link text also has hidden text, so the match is on the start of the text.
  get continueLinks() {
    return $$('//table//a[starts-with(normalize-space(), "Continue")]')
  }
}

export const homepageV2Page = new HomepagePage({ slug: 'e2e-form-v2' })

export default new HomepagePage({ slug: 'e2e-form' })
