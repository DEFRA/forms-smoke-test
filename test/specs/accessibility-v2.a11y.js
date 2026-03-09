import { browser } from '@wdio/globals'
import { before } from 'mocha'

import { checkAccessibility } from '~/test/helpers/accessibility.js'
import nameEntryPage from '~/test/page-objects/name.page.js'
import emailPage from '~/test/page-objects/email.page.js'
import phoneNumberPage from '~/test/page-objects/phone-number.page.js'
import addressPage from '~/test/page-objects/address.page.js'
import certificateAddressPage from '~/test/page-objects/certificate-address.page.js'
import policyStartDatePage from '~/test/page-objects/policy-start-date.page.js'
import uploadFilePage from '~/test/page-objects/upload-file.page.js'
import selectNoOfUnicornsPage from '~/test/page-objects/select-no-of-unicorns.page.js'
import selectTypeOfUnicornsPage from '~/test/page-objects/select-type-of-unicorns.page.js'
import unicornsTextPage from '~/test/page-objects/unicorns-text.page.js'
import noOfUnicornsStaffPage from '~/test/page-objects/no-of-unicorns-staff.page.js'
import summaryPage from '~/test/page-objects/summary.page.js'
import path from 'node:path'

const __dirname = path.resolve()

describe('Accessibility - Register unicorn breeder form v2', () => {
  before(async () => {
    await nameEntryPage.openV2()
  })

  it('name page should have no WCAG 2.2 AA violations', async () => {
    await checkAccessibility(browser, 'v2-name-page')

    await nameEntryPage.enterName.setValue('John Doe')
    await nameEntryPage.submitButton.click()
  })

  it('email page should have no WCAG 2.2 AA violations', async () => {
    await checkAccessibility(browser, 'v2-email-page')

    await emailPage.enterEmail.setValue('john.doe@example.co.uk')
    await emailPage.submitButton.click()
  })

  it('phone number page should have no WCAG 2.2 AA violations', async () => {
    await checkAccessibility(browser, 'v2-phone-number-page')

    await phoneNumberPage.enterPhoneNumber.setValue('07779875')
    await phoneNumberPage.submitButton.click()
  })

  it('address page should have no WCAG 2.2 AA violations', async () => {
    await checkAccessibility(browser, 'v2-address-page')

    await Promise.all([
      addressPage.enterAddressLine1.setValue('1 High Street'),
      addressPage.enterTown.setValue('Townsville'),
      addressPage.enterPostcode.setValue('TS1 1ST')
    ])
    await addressPage.submitButton.click()
  })

  it('certificate address page should have no WCAG 2.2 AA violations', async () => {
    await checkAccessibility(browser, 'v2-certificate-address-page')

    await certificateAddressPage.selectYesOrNo.click()
    await certificateAddressPage.submitButton.click()
  })

  it('policy start date page should have no WCAG 2.2 AA violations', async () => {
    await checkAccessibility(browser, 'v2-policy-start-date-page')

    await Promise.all([
      policyStartDatePage.enterDay.setValue('01'),
      policyStartDatePage.enterMonth.setValue('02'),
      policyStartDatePage.enterYear.setValue('2024')
    ])
    await policyStartDatePage.submitButton.click()
  })

  it('upload file page should have no WCAG 2.2 AA violations', async () => {
    await checkAccessibility(browser, 'v2-upload-file-page')

    const filePath = path.join(__dirname, 'test/file/test-file.txt')
    const remoteFilePath = browser.uploadFile(filePath)
    await uploadFilePage.chooseFile.setValue(await remoteFilePath)
    await uploadFilePage.uploadFile.click()

    let fileUploaded = true
    while (fileUploaded) {
      const uploadedFileElem = uploadFilePage.checkForUploadedFile
      if (await uploadedFileElem.isExisting()) {
        fileUploaded = false
      }
    }

    await uploadFilePage.submitButton.click()
  })

  it('select number of unicorns page should have no WCAG 2.2 AA violations', async () => {
    await checkAccessibility(browser, 'v2-select-no-of-unicorns-page')

    await selectNoOfUnicornsPage.select1to5.click()
    await selectNoOfUnicornsPage.submitButton.click()
  })

  it('select type of unicorns page should have no WCAG 2.2 AA violations', async () => {
    await checkAccessibility(browser, 'v2-select-type-of-unicorns-page')

    await selectTypeOfUnicornsPage.selectFlying.click()
    await selectTypeOfUnicornsPage.selectAquatic.click()
    await selectTypeOfUnicornsPage.submitButton.click()
  })

  it('unicorns text page should have no WCAG 2.2 AA violations', async () => {
    await checkAccessibility(browser, 'v2-unicorns-text-page')

    await unicornsTextPage.enterWhereYouKeepUnicorn.setValue(
      'unicorns are kept in the garden'
    )
    await unicornsTextPage.submitButton.click()
  })

  it('number of staff page should have no WCAG 2.2 AA violations', async () => {
    await checkAccessibility(browser, 'v2-no-of-unicorns-staff-page')

    await noOfUnicornsStaffPage.enterNoOfUnicornStaff.setValue('5')
    await noOfUnicornsStaffPage.submitButton.click()
  })

  it('summary page should have no WCAG 2.2 AA violations', async () => {
    await checkAccessibility(browser, 'v2-summary-page')

    await summaryPage.submitButton.click()
  })

  it('confirmation page should have no WCAG 2.2 AA violations', async () => {
    await checkAccessibility(browser, 'v2-confirmation-page')
  })
})
