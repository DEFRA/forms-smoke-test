import { browser, expect } from '@wdio/globals'
import { before } from 'mocha'

import nameEntryPage from '~/test/page-objects/name.page.js'
import emailPage from '~/test/page-objects/email.page.js'
import saveYourProgressPage from '~/test/page-objects/save-your-progress.page.js'

describe('Save and exit form - e2e', () => {
  before(async () => {
    await nameEntryPage.open()
  })

  it('starts the flow of save and exit', async () => {
    await expect(browser).toHaveTitle(`What's your name? - e2e form - GOV.UK`)
    await nameEntryPage.enterName.setValue('John Doe')
    await nameEntryPage.submitButton.click()
    await expect(browser).toHaveTitle(
      `What's your email address? - e2e form - GOV.UK`
    )
  })

  it('saves and exits', async () => {
    await emailPage.enterEmail.setValue('john.doe@example.co.uk')
    await expect(emailPage.saveAndExit).toBeDisplayed()
    await emailPage.saveAndExit.click()
    await expect(browser).toHaveTitle(
      `Save your progress for later - e2e form - GOV.UK`
    )

    // await expect(saveYourProgressPage.emailAddressField).toMatchSnapshot()
    // await expect(browser).toMatchFullPageSnapshot('fullPage')

    await expect(saveYourProgressPage.saveProgress).toBeDisplayed()

    // await expect(saveYourProgressPage.emailAddressField).toMatchSnapshot()
    // await expect(saveYourProgressPage.securityQuestionMemorablePlace).toMatchSnapshot()
    // await expect(saveYourProgressPage.securityAnswerField).toMatchSnapshot()
    // await expect(saveYourProgressPage.saveProgress).toMatchSnapshot()

    await saveYourProgressPage.emailAddressField.setValue(
      'jignesh.nayi@defra.gov.uk'
    )
    await saveYourProgressPage.confirmEmailAddressField.setValue(
      'jignesh.nayi@defra.gov.uk'
    )
    await saveYourProgressPage.securityAnswerField.setValue('London')
    await saveYourProgressPage.saveProgress.click()
  })
})
