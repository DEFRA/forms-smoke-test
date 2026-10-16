import { FormPage } from '~/test/page-objects/form.page.js'
import { $ } from '@wdio/globals'

class HomepagePage extends FormPage {
  prefix = '/homepage'

  get signOutLink() {
    return $('=Sign out')
  }

  // Each saved form that the person can resume has a Continue link. The link
  // text also has hidden text, so the match is on the start of the text.
  //
  // The table puts the saved forms in the order that they expire, the soonest
  // first, and an expired form has no link. Each save expires the same number
  // of days after it is made, so the last link is for the newest save.
  get latestContinueLink() {
    return $('(//table//a[starts-with(normalize-space(), "Continue")])[last()]')
  }
}

export const homepageV2Page = new HomepagePage({ slug: 'e2e-form-v2' })

export default new HomepagePage({ slug: 'e2e-form' })
