import { browser, expect } from '@wdio/globals'
import { before } from 'mocha'

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
import path from 'path'

const __dirname = path.resolve()

describe('Register unicorn breeder form - e2e', () => {
  before(async () => {
    await nameEntryPage.open()
  })

  it('should enter name', async () => {
    await expect(browser).toHaveTitle(`What's your name? - e2e form - GOV.UK`)
    await nameEntryPage.enterName.setValue('John Doe')
    await nameEntryPage.submitButton.click()

    await expect(browser).toHaveTitle(
      `What's your email address? - e2e form - GOV.UK`
    )
  })

  it('should enter email address', async () => {
    await emailPage.enterEmail.setValue('john.doe@example.co.uk')
    await emailPage.submitButton.click()
    await expect(browser).toHaveTitle(
      `What's your phone number? - e2e form - GOV.UK`
    )
  })

  it('should enter phone number', async () => {
    await phoneNumberPage.enterPhoneNumber.setValue('07779875')
    await phoneNumberPage.submitButton.click()

    await expect(browser).toHaveTitle(
      `What's your address? - e2e form - GOV.UK`
    )
  })

  it('should enter address', async () => {
    await Promise.all([
      addressPage.enterAddressLine1.setValue('1 High Street'),
      addressPage.enterTown.setValue('Townsville'),
      addressPage.enterPostcode.setValue('TS1 1ST')
    ])
    await addressPage.submitButton.click()

    await expect(browser).toHaveTitle(
      'Do you want your unicorn breeder certificate sent to this address? - e2e form - GOV.UK'
    )
  })

  it('should select Yes to use same address for certificate', async () => {
    await certificateAddressPage.selectYesOrNo.click()
    await certificateAddressPage.submitButton.click()

    await expect(browser).toHaveTitle(
      'When does your unicorn insurance policy start? - e2e form - GOV.UK'
    )
  })

  it('should enter policy start date', async () => {
    await Promise.all([
      policyStartDatePage.enterDay.setValue('01'),
      policyStartDatePage.enterMonth.setValue('02'),
      policyStartDatePage.enterYear.setValue('2024')
    ])

    await policyStartDatePage.submitButton.click()

    await expect(browser).toHaveTitle(
      'Upload your insurance certificate - e2e form - GOV.UK'
    )
  })

  it('should upload file', async () => {
    const filePath = path.join(__dirname, 'test/file/test-file.txt')
    const remoteFilePath = browser.uploadFile(filePath)
    await uploadFilePage.chooseFile.setValue(await remoteFilePath)
    await uploadFilePage.uploadFile.click()

    let fileUploaded = true

    while (fileUploaded) {
      const inLink = uploadFilePage.refreshPage

      await inLink.click()
      const uploadedFileElem = uploadFilePage.checkForUploadedFile

      if (await uploadedFileElem.isExisting()) {
        fileUploaded = false
      }
    }

    const uploadedElem = uploadFilePage.checkForUploadedFile
    await expect(uploadedElem).toBeDisplayed()
    await uploadFilePage.submitButton.click()

    await expect(browser).toHaveTitle(
      `How many unicorns do you expect to breed each year? - e2e form - GOV.UK`
    )
  })

  it('should select how many unicorns', async () => {
    await selectNoOfUnicornsPage.select1to5.click()
    await selectNoOfUnicornsPage.submitButton.click()

    await expect(browser).toHaveTitle(
      'What type of unicorns will you breed? - e2e form - GOV.UK'
    )
  })

  it('should select type of unicorns', async () => {
    await selectTypeOfUnicornsPage.selectFlying.click()
    await selectTypeOfUnicornsPage.selectAquatic.click()
    await selectTypeOfUnicornsPage.submitButton.click()

    await expect(browser).toHaveTitle(
      'Where will you keep the unicorns? - e2e form - GOV.UK'
    )
  })

  it('should enter where you will keep unicorns', async () => {
    await unicornsTextPage.enterWhereYouKeepUnicorn.setValue(
      'unicorns are kept in the garden'
    )
    await unicornsTextPage.submitButton.click()

    await expect(browser).toHaveTitle(
      'How many members of staff will look after the unicorns? - e2e form - GOV.UK'
    )
  })

  it('should enter no of unicorns staff', async () => {
    await noOfUnicornsStaffPage.enterNoOfUnicornStaff.setValue('5')
    await noOfUnicornsStaffPage.submitButton.click()

    await expect(browser).toHaveTitle('Summary - e2e form - GOV.UK')
  })

  it('should check summary page and submit form', async () => {
    await summaryPage.summary.isExisting()
    await summaryPage.contactDetails.isExisting()

    await expect(summaryPage.summaryList).toMatchSnapshot()

    await summaryPage.submitButton.click()

    await expect(browser).toHaveTitle('Form submitted - e2e form - GOV.UK')
  })
})
