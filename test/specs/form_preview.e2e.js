import { browser, expect, $ } from '@wdio/globals'

import FormPage from '~/test/page-objects/FormsRunner.page.js'

describe('Forms Preview', () => {
  it('Should preview a form in the runner ', async () => {
    await FormPage.open()
    await expect(browser).toHaveTitle(
      'Page one - Do not use - Used for Automated Tests - GOV.UK'
    )
    const elem = $('[type="text"]')
    await elem.setValue('some text')
    const submitButton = $('button=Continue')
    await submitButton.click()
    await expect(browser).toHaveTitle(
      'Summary - Do not use - Used for Automated Tests - GOV.UK'
    )
    const sendButton = $('button=Send')
    await sendButton.click()
    await expect(browser).toHaveTitle(
      'Form submitted - Do not use - Used for Automated Tests - GOV.UK'
    )
  })
})
