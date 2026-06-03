import { browser } from '@wdio/globals'
import { before } from 'mocha'

import { checkAccessibility } from '~/test/helpers/accessibility.js'
import nameEntryPage from '~/test/page-objects/name.page.js'
import emailPage from '~/test/page-objects/email.page.js'
import saveYourProgressPage from '~/test/page-objects/save-your-progress.page.js'

describe('Accessibility - Save and exit flow', () => {
  before(async () => {
    await nameEntryPage.open()
  })

  it('name page should have no WCAG 2.2 AA violations (save flow)', async () => {
    await checkAccessibility(browser, 'save-exit-name-page')

    await nameEntryPage.enterName.setValue('John Doe')
    await nameEntryPage.submitButton.click()
  })

  it('email page should have no WCAG 2.2 AA violations (save flow)', async () => {
    await checkAccessibility(browser, 'save-exit-email-page')

    await emailPage.enterEmail.setValue('john.doe@example.co.uk')
    await emailPage.saveAndExit.click()
  })

  it('save your progress page should have no WCAG 2.2 AA violations', async () => {
    await checkAccessibility(browser, 'save-exit-save-progress-page')

    await saveYourProgressPage.emailAddressField.setValue(
      'defraforms@defra.gov.uk'
    )
    await saveYourProgressPage.confirmEmailAddressField.setValue(
      'defraforms@defra.gov.uk'
    )
    await saveYourProgressPage.securityQuestionMemorablePlace.click()
    await saveYourProgressPage.securityAnswerField.setValue('London')
    await saveYourProgressPage.saveProgress.click()
  })

  it('progress saved confirmation page should have no WCAG 2.2 AA violations', async () => {
    await checkAccessibility(browser, 'save-exit-confirmation-page')
  })
})
