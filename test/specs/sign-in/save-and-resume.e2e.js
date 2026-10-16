import { browser, expect } from '@wdio/globals'
import { before } from 'mocha'

import { completeE2eFormV2 } from '~/test/helpers/e2e-form-v2.js'
import { homepageV2Page } from '~/test/page-objects/homepage.page.js'
import saveConfirmationPage from '~/test/page-objects/save-confirmation.page.js'
import { summaryV2Page } from '~/test/page-objects/summary.page.js'

// The smoke test account keeps the saved forms of earlier runs. A name that
// is different for each run shows that the resumed answers are from this run.
const NAME = `Smoke Test ${String(Date.now())}`

// forms-runner saves the form through SNS and SQS, so the saved form can take
// some minutes to show on the homepage
const SAVED_FORM_TIMEOUT = 5 * 60 * 1000

/**
 * The href of the resume link of the newest saved form on the homepage
 */
async function readLatestResumeHref() {
  await homepageV2Page.open()
  return homepageV2Page.latestResumeHref()
}

/** @type {string | null} */
let latestResumeHrefBefore

// Runs after the sign-in spec in the same browser, so the person starts
// signed in
describe('Save and exit when signed in - e2e', () => {
  before(async () => {
    latestResumeHrefBefore = await readLatestResumeHref()
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

    // The account keeps the saved forms of earlier runs. The save of this run
    // is on the homepage when the newest resume link is a different link.
    await browser.waitUntil(
      async () => (await readLatestResumeHref()) !== latestResumeHrefBefore,
      {
        timeout: SAVED_FORM_TIMEOUT,
        interval: 5000,
        timeoutMsg: 'the saved form did not show on the homepage'
      }
    )
  })

  it('resumes the saved form', async () => {
    await homepageV2Page.resumeLatestForm()

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
