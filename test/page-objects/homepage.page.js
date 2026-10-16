import { FormPage } from '~/test/page-objects/form.page.js'
import { $, $$ } from '@wdio/globals'

class HomepagePage extends FormPage {
  prefix = '/homepage'

  get signOutLink() {
    return $('=Sign out')
  }

  // Each saved form that the person can resume has a link with the text
  // "Continue" and hidden text after it, so the match is on part of the text.
  get continueLinks() {
    return $$('*=Continue')
  }

  // Whether the account has a saved form to resume
  async hasResumeLink() {
    return (await this.continueLinks.getElements()).length > 0
  }

  // The table puts the saved forms in the order that they expire, the soonest
  // first, and an expired form has no link. Each save expires the same number
  // of days after it is made, so the last link is for the newest save. The
  // newest save can be from an earlier run, so a test that needs its own save
  // compares the link from before and after the save.
  async latestContinueLink() {
    const link = (await this.continueLinks.getElements()).at(-1)
    if (!link) {
      throw new Error('the homepage has no saved form to resume')
    }
    return link
  }
}

export { HomepagePage }

export const homepageV2Page = new HomepagePage({
  slug: 'e2e-form-v2',
  state: 'draft'
})

export default new HomepagePage({ slug: 'e2e-form', state: 'draft' })
