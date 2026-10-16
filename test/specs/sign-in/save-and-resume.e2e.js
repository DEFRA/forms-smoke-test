import { browser, expect } from '@wdio/globals'
import { before } from 'mocha'

import { completeE2eFormV2 } from '~/test/helpers/e2e-form-v2.js'
import {
  readLatestResumeHref,
  SAVED_FORM_TIMEOUT,
  waitForNewSaveAndExitLink
} from '~/test/helpers/save-and-exit.js'
import { homepageV2Page } from '~/test/page-objects/homepage.page.js'
import saveConfirmationPage from '~/test/page-objects/save-confirmation.page.js'
import { summaryV2Page } from '~/test/page-objects/summary.page.js'

// The smoke test account keeps the saved forms of earlier runs. A name that
// is different for each run shows that the resumed answers are from this run.
const NAME = `Smoke Test ${String(Date.now())}`

/** @type {string | null} */
let latestResumeHrefBefore

// Runs after the sign-in spec in the same browser, so the person starts
// signed in
describe('Save and exit when signed in - e2e', () => {
  before(async () => {
    latestResumeHrefBefore = await readLatestResumeHref(homepageV2Page)
  })

  it('saves the answers without the security question', async () => {
    await completeE2eFormV2(NAME)

    await summaryV2Page.saveAndExit.click()
    await expect(saveConfirmationPage.confirmationPanelTitle).toBeDisplayed()
  })
})

describe('Resume when signed in - e2e', () => {
  it('shows the saved form on the homepage', async function () {
    // The wdio config gives each test 60 seconds, which is less than the
    // wait. A longer limit for this test lets the wait run to its end and
    // fail with its own message, rather than a mocha timeout.
    this.timeout(SAVED_FORM_TIMEOUT + 30_000)

    await waitForNewSaveAndExitLink(homepageV2Page, latestResumeHrefBefore)
  })

  it('resumes the saved form', async () => {
    await (await homepageV2Page.latestContinueLink()).click()

    await expect(browser).toHaveTitle(
      'Welcome back to your form - e2e form - v2 - GOV.UK'
    )
  })

  it('shows the saved answers on the summary page', async () => {
    // The engine sends a person with missing answers back to the first
    // question with no answer. The summary page shows only when all the
    // answers loaded.
    await summaryV2Page.open()
    await expect(browser).toHaveTitle(
      'Check your answers before sending your form - e2e form - v2 - GOV.UK'
    )

    await expect(summaryV2Page.answer('Name')).toHaveText(NAME)
    await expect(summaryV2Page.answer('Email adress')).toHaveText(
      'john.doe@example.co.uk'
    )
    await expect(summaryV2Page.answer('Phone number')).toHaveText('07777777777')
    await expect(summaryV2Page.answer('Addresses')).toHaveText(
      expect.stringContaining('1 High Street')
    )
    await expect(
      summaryV2Page.answer('Send certificate to same address')
    ).toHaveText('Yes')
    await expect(
      summaryV2Page.answer('Unicorn insurance policy start date')
    ).toHaveText('1 February 2024')
    await expect(summaryV2Page.answer('Number of unicorns')).toHaveText(
      '1 to 5'
    )
    await expect(summaryV2Page.answer('Type of unicorn')).toHaveText(
      expect.stringContaining('Flying')
    )
    await expect(summaryV2Page.answer('Where you keep the unicorn')).toHaveText(
      'unicorns are kept in the garden'
    )
    await expect(summaryV2Page.answer('Number of staff')).toHaveText('5')
  })
})
