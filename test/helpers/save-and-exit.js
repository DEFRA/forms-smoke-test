import { browser } from '@wdio/globals'

// forms-runner saves the form through SNS and SQS, so the saved form can take
// some minutes to show on the homepage
export const SAVED_FORM_TIMEOUT = 5 * 60 * 1000

/**
 * Opens the homepage and reads the href of the resume link of each saved form
 * @param {HomepagePage} homepage
 */
export async function readResumeHrefs(homepage) {
  await homepage.open()
  return homepage.resumeHrefs()
}

/**
 * Reloads the homepage until it has a resume link that was not there before
 * the save. The account keeps the saved forms of earlier runs, so the new link
 * is the save of this run.
 * @param {HomepagePage} homepage
 * @param {string[]} hrefsBefore - from readResumeHrefs before the save
 * @returns {Promise<string>} the href of the new resume link
 */
export function waitForNewSaveAndExitLink(homepage, hrefsBefore) {
  // waitUntil resolves with the value that the condition gives, which is the
  // new href
  return browser.waitUntil(
    async () =>
      (await readResumeHrefs(homepage)).find(
        (href) => !hrefsBefore.includes(href)
      ),
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
