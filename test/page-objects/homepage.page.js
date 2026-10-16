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

  // The table puts the saved forms in the order that they expire, the soonest
  // first, and an expired form has no link. Each save expires the same number
  // of days after it is made, so the last link is for the newest save. The
  // newest save can be from an earlier run, so a test that needs its own save
  // compares the link from before and after the save.
  async #latestContinueLink() {
    const links = await this.continueLinks.getElements()
    return links.at(-1)
  }

  /**
   * The href of the resume link of the newest saved form
   * @returns {Promise<string | null>} null when the account has no saved form to resume
   */
  async latestResumeHref() {
    const link = await this.#latestContinueLink()
    return link ? link.getAttribute('href') : null
  }

  // Opens the newest saved form
  async resumeLatestForm() {
    const link = await this.#latestContinueLink()
    if (!link) {
      throw new Error('the homepage has no saved form to resume')
    }
    await link.click()
  }
}

export const homepageV2Page = new HomepagePage({
  slug: 'e2e-form-v2',
  state: 'draft'
})

export default new HomepagePage({ slug: 'e2e-form', state: 'draft' })
