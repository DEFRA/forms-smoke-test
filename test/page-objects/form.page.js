import { Page } from '~/test/page-objects/page.js'
import { $ } from '@wdio/globals'

/**
 * A page that belongs to one form. The page object knows the form, so that
 * `open()` needs no arguments.
 */
class FormPage extends Page {
  // The part of the path before the slug. A page that is not at `/form` sets
  // its own value.
  prefix = '/form'

  // The part of the path after the slug, for example `/summary`
  suffix = ''

  /**
   * @param {object} form
   * @param {string} form.slug - the slug of the form
   * @param {'draft' | 'live'} [form.state] - the state of the form to preview. With no state, the page is on the form that people use.
   */
  constructor({ slug, state }) {
    super()
    this.slug = slug
    this.state = state
  }

  open() {
    const preview = this.state ? `/preview/${this.state}` : ''
    return super.open(`${this.prefix}${preview}/${this.slug}${this.suffix}`)
  }

  get saveAndExit() {
    return $('button=Save and exit')
  }
}

export { FormPage }
