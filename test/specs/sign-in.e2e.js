import { browser, expect } from '@wdio/globals'
import { before } from 'mocha'

import { readSecurityCode } from '~/test/helpers/security-code.js'
import homepagePage from '~/test/page-objects/homepage.page.js'
import signInPage from '~/test/page-objects/sign-in.page.js'

// forms-identity-api sends no email to an address at this domain. It keeps
// the security code for the test to read.
const EMAIL = 'smoke-test@example.forms.defra.gov.uk'

// From the range that Ofcom reserves for fiction (07700 900000 to 900999),
// so the number cannot belong to a real person
const PHONE = '07700900000'

describe('Sign in - e2e', () => {
  before(async () => {
    await homepagePage.open()
  })

  it('asks a person with no session for an email address', async () => {
    await signInPage.emailField.setValue(EMAIL)
    await signInPage.continueButton.click()
    await expect(signInPage.securityCodeField).toBeDisplayed()
  })

  it('accepts the security code', async () => {
    await signInPage.securityCodeField.setValue(await readSecurityCode(EMAIL))
    await signInPage.continueButton.click()

    // The first sign-in in an environment makes the account, and a new
    // account must give a phone number. Later sign-ins skip this page.
    if (await signInPage.phoneField.isExisting()) {
      await signInPage.phoneField.setValue(PHONE)
      await signInPage.continueButton.click()
    }

    await expect(browser).toHaveUrl(expect.stringContaining(homepagePage.path))
  })

  it('shows the homepage of the form to the signed-in person', async () => {
    await expect(homepagePage.pageHeading).toHaveText('e2e form')
    await expect(homepagePage.signOutLink).toBeExisting()
  })
})
