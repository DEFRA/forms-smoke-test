import { browser, expect } from '@wdio/globals'

import FormPage from 'page-objects/FormsRunner.page'

describe('Forms Preview', () => {
  it('Should preview a form in the runner ', async () => {
    await FormPage.open()
    await expect(browser).toHaveTitle('Page one - Do not use - Used for Automated Tests - GOV.UK')
  })
})
