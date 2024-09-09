import { browser, expect } from '@wdio/globals'

import nameEntryPage from '../page-objects/name.page.js'
import emailPage from '../page-objects/email.page.js'
import phoneNumberPage from '../page-objects/phone-number.page.js'
import addressPage from '../page-objects/address.page.js'
import certificateAddressPage from '../page-objects/certificate-address.page.js'

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

  it('should enter address', async () => {
    await addressPage.enterAddressLine1.setValue('1 High Street')
    await addressPage.enterTown.setValue('Townsville')
    await addressPage.enterPostcode.setValue('TS1 1ST')

    await addressPage.submitButton.click()
    await expect(browser).toHaveTitle(
      `Do you want your unicorn breeder certificate sent to this address? - e2e form - GOV.UK`
    )
  })

  it('should select Yes to use same address for certificate', async () => {
    await certificateAddressPage.selectYesOrNo.click()

    await certificateAddressPage.submitButton.click()
    await expect(browser).toHaveTitle(
      `When does your unicorn insurance policy start? - e2e form - GOV.UK`
    )
  })
})
