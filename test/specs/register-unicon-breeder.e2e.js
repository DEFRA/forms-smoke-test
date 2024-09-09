import { browser, expect } from '@wdio/globals'

import nameEntryPage from '../page-objects/name.page'
import emailPage from '../page-objects/email.page'
import phoneNumberPage from '../page-objects/phone-number.page'

describe('Register unicorn breeder form - e2e', () => {
  before(async () => {
    await browser.url('/preview/draft/e2e-form/whats-your-name')
  })

  it('should enter name', async () => {
    await expect(browser).toHaveTitle(`What's your name? - e2e form - GOV.UK`)

    await nameEntryPage.enterName.setValue('John Doe')

    await nameEntryPage.submitButton.click()
    await expect(browser).toHaveTitle(
      `What's your email address? - e2e form - GOV.UK`
    )
  })

  it('should enter email address', async () => {
    await emailPage.enterEmail.setValue('john.doe@example.co.uk')

    await emailPage.submitButton.click()
    await expect(browser).toHaveTitle(
      `What's your phone number? - e2e form - GOV.UK`
    )
  })

  it('should enter phone number', async () => {
    await phoneNumberPage.enterPhoneNumber.setValue('07779875')

    await phoneNumberPage.submitButton.click()
    await expect(browser).toHaveTitle(
      `What's your address? - e2e form - GOV.UK`
    )
  })
})
