import { expect } from '@wdio/globals'
import { before } from 'mocha'

import homepagePage from '~/test/page-objects/homepage.page.js'
import signOutPage from '~/test/page-objects/sign-out.page.js'
import signedOutPage from '~/test/page-objects/signed-out.page.js'

// Runs last in the same browser as the sign-in spec, so the person starts
// signed in
describe('Sign out - e2e', () => {
  before(async () => {
    await homepagePage.open()
  })

  it('asks the person to confirm the sign-out', async () => {
    await homepagePage.signOutLink.click()
    await expect(signOutPage.pageHeading).toHaveText(
      'Are you sure you want to sign out?'
    )
  })

  it('signs the person out', async () => {
    await signOutPage.signOutButton.click()
    await expect(signedOutPage.pageHeading).toHaveText('You have signed out')
  })
})
