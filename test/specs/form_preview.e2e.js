import { browser, expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page'

describe('Forms Preview', () => {
  it('Should preview a form in the runner ', async () => {
    await HomePage.open()
    await expect(browser).toHaveTitle('Page one - Form A1 - GOV.UK')
  })
})
