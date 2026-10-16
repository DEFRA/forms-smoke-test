import { $, browser, expect } from '@wdio/globals'
import { before } from 'mocha'

import { completeE2eFormV2 } from '~/test/helpers/e2e-form-v2.js'
import homepagePage from '~/test/page-objects/homepage.page.js'
import saveConfirmationPage from '~/test/page-objects/save-confirmation.page.js'
import summaryPage from '~/test/page-objects/summary.page.js'

// The smoke test account keeps the saved forms of earlier runs. A name that
// is different for each run shows that the resumed answers are from this run.
const NAME = `Smoke Test ${String(Date.now())}`

// forms-runner saves the form through SNS and SQS, so the saved form can take
// some minutes to show on the homepage
const SAVED_FORM_TIMEOUT = 5 * 60 * 1000

/**
 * The resume link of each saved form on the homepage
 * @returns {Promise<string[]>}
 */
async function readResumeLinks() {
  await homepagePage.openV2()
  const hrefs = []
  for (const link of await homepagePage.continueLinks.getElements()) {
    hrefs.push(await link.getAttribute('href'))
  }
  return hrefs
}

/** @type {string[]} */
let resumeLinksBefore

/** @type {string | undefined} */
let resumeLink

// Runs after the sign-in spec in the same browser, so the person starts
// signed in
describe('Save and exit when signed in - e2e', () => {
  before(async () => {
    resumeLinksBefore = await readResumeLinks()
  })

  it('saves the answers without the security question', async () => {
    await completeE2eFormV2(NAME)

    await summaryPage.saveAndExit.click()
    await expect(saveConfirmationPage.confirmationPanelTitle).toBeDisplayed()
  })
})

describe('Resume when signed in - e2e', () => {
  it('shows the saved form on the homepage', async function () {
    // Longer than the wait, so that the wait gives its own message
    this.timeout(SAVED_FORM_TIMEOUT + 30_000)

    // The saved form of this run is the one with a link that was not there
    // before the save, rather than a row at a given position
    await browser.waitUntil(
      async () => {
        resumeLink = (await readResumeLinks()).find(
          (link) => !resumeLinksBefore.includes(link)
        )
        return resumeLink !== undefined
      },
      {
        timeout: SAVED_FORM_TIMEOUT,
        interval: 5000,
        timeoutMsg: 'the saved form did not show on the homepage'
      }
    )
  })

  it('resumes the saved form', async () => {
    await $(`a[href="${String(resumeLink)}"]`).click()

    await expect(browser).toHaveTitle(
      'Welcome back to your form - e2e form - v2 - GOV.UK'
    )
  })

  it('shows the saved answers on the summary page', async () => {
    // The engine sends a person with missing answers back to the first
    // question with no answer. The summary page shows only when all the
    // answers loaded.
    await summaryPage.open('e2e-form-v2')
    await expect(browser).toHaveTitle(
      'Check your answers before sending your form - e2e form - v2 - GOV.UK'
    )

    await expect(summaryPage.answer('Name')).toHaveText(NAME)
    await expect(summaryPage.answer('Email adress')).toHaveText(
      'john.doe@example.co.uk'
    )
    await expect(summaryPage.answer('Phone number')).toHaveText('07777777777')
    await expect(summaryPage.answer('Addresses')).toHaveText(
      expect.stringContaining('1 High Street')
    )
    await expect(
      summaryPage.answer('Send certificate to same address')
    ).toHaveText('Yes')
    await expect(
      summaryPage.answer('Unicorn insurance policy start date')
    ).toHaveText('1 February 2024')
    await expect(summaryPage.answer('Number of unicorns')).toHaveText('1 to 5')
    await expect(summaryPage.answer('Type of unicorn')).toHaveText(
      expect.stringContaining('Flying')
    )
    await expect(summaryPage.answer('Where you keep the unicorn')).toHaveText(
      'unicorns are kept in the garden'
    )
    await expect(summaryPage.answer('Number of staff')).toHaveText('5')
  })
})
