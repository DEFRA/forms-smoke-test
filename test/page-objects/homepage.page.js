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

  // The href of the resume link of each saved form on the page. The order of
  // the rows can change from one forms-runner version to the next, so a test
  // finds its own save by its href rather than by its position.
  async resumeHrefs() {
    const hrefs = []
    for (const link of await this.continueLinks.getElements()) {
      hrefs.push(await link.getAttribute('href'))
    }
    return hrefs
  }

  /**
   * Opens a saved form from its resume link
   * @param {string} href - from resumeHrefs
   */
  async resumeForm(href) {
    await $(`a[href="${href}"]`).click()
  }
}

export { HomepagePage }

export const homepageV2Page = new HomepagePage({
  slug: 'e2e-form-v2',
  state: 'draft'
})

export default new HomepagePage({ slug: 'e2e-form', state: 'draft' })
