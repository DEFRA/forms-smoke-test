import { Page } from '~/test/page-objects/page.js'

/**
 * A page that belongs to one form. The page object knows the form, so that
 * `open()` needs no arguments.
 */
class FormPage extends Page {
  /**
   * @param {object} form
   * @param {string} form.slug - the slug of the form
   * @param {boolean} [form.preview] - open the preview of the form rather than the form that people use
   * @param {'draft' | 'live'} [form.state] - the state of the form to preview
   */
  constructor({ slug, preview = true, state = 'draft' }) {
    super()
    this.slug = slug
    this.preview = preview
    this.state = state
  }

  /**
   * The path of a page of this form
   * @param {string} prefix - the part of the path before the slug, for example `/form`
   * @param {string} [suffix] - the part of the path after the slug, for example `/summary`
   */
  formPath(prefix, suffix = '') {
    const preview = this.preview ? `/preview/${this.state}` : ''
    return `${prefix}${preview}/${this.slug}${suffix}`
  }
}

export { FormPage }
