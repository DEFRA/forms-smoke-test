import { browser } from '@wdio/globals'

// forms-runner saves the form through SNS and SQS, so the saved form can take
// some minutes to show on the homepage
export const SAVED_FORM_TIMEOUT = 5 * 60 * 1000

/**
 * Opens the homepage and reads the href of the resume link of the newest
 * saved form.
 * @param {HomepagePage} homepage
 * @returns {Promise<string | null>} null when the account has no saved form, which is the case on the first run in an environment
 */
export async function readLatestResumeHref(homepage) {
  await homepage.open()
  if (!(await homepage.hasResumeLink())) {
    return null
  }
  return (await homepage.latestContinueLink()).getAttribute('href')
}

/**
 * Reloads the homepage until the newest resume link is different from the
 * one before the save. The account keeps the saved forms of earlier runs, so
 * a different link shows that the save of this run is on the homepage.
 * @param {HomepagePage} homepage
 * @param {string | null} hrefBefore - from readLatestResumeHref before the save
 */
export async function waitForNewSaveAndExitLink(homepage, hrefBefore) {
  await browser.waitUntil(
    async () => (await readLatestResumeHref(homepage)) !== hrefBefore,
    {
      timeout: SAVED_FORM_TIMEOUT,
      interval: 5000,
      timeoutMsg: 'the saved form did not show on the homepage'
    }
  )
}

/**
 * @import { HomepagePage } from '~/test/page-objects/homepage.page.js'
 */
