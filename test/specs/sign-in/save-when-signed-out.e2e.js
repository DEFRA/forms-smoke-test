import { browser, expect } from '@wdio/globals'
import { before } from 'mocha'

import { completeE2eFormV2 } from '~/test/helpers/e2e-form-v2.js'
import {
  readSecurityCode,
  SMOKE_TEST_EMAIL
} from '~/test/helpers/security-code.js'
import saveConfirmationPage from '~/test/page-objects/save-confirmation.page.js'
import saveSignInRequiredPage from '~/test/page-objects/save-sign-in-required.page.js'
import signInPage from '~/test/page-objects/sign-in.page.js'
import { summaryV2Page } from '~/test/page-objects/summary.page.js'

// Runs after the sign-out spec in the same browser, so the account exists and
// the sign-in has no phone number page
describe('Save and exit when signed out - e2e', () => {
  before(async () => {
    // Sign-out keeps the form answers in the session, and the upload page
    // behaves differently for a session that already has a file. A new session
    // starts the form from nothing.
    await browser.deleteCookies()
  })

  it('asks the person to sign in before the save', async () => {
    await completeE2eFormV2(`Smoke Test ${String(Date.now())}`)

    await summaryV2Page.saveAndExit.click()
    await expect(saveSignInRequiredPage.pageHeading).toHaveText(
      'Sign in to save your progress'
    )
  })

  it('sends the person to sign in', async () => {
    await saveSignInRequiredPage.signInButton.click()
    await expect(signInPage.emailField).toBeDisplayed()

    await signInPage.emailField.setValue(SMOKE_TEST_EMAIL)
    await signInPage.continueButton.click()
    await expect(signInPage.securityCodeField).toBeDisplayed()
  })

  it('saves the answers after the sign-in', async () => {
    await signInPage.securityCodeField.setValue(
      await readSecurityCode(SMOKE_TEST_EMAIL)
    )
    await signInPage.continueButton.click()

    // forms-runner sends a person with no answers in the session back to the
    // start of the form. The confirmation shows only when the answers
    // stayed in the session during the sign-in.
    await expect(saveConfirmationPage.confirmationPanelTitle).toBeDisplayed()
  })
})
