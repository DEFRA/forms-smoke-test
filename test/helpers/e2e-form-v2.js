import { browser, expect } from '@wdio/globals'
import path from 'node:path'

import addressPage from '~/test/page-objects/address.page.js'
import certificateAddressPage from '~/test/page-objects/certificate-address.page.js'
import emailPage from '~/test/page-objects/email.page.js'
import nameEntryPage from '~/test/page-objects/name.page.js'
import noOfUnicornsStaffPage from '~/test/page-objects/no-of-unicorns-staff.page.js'
import phoneNumberPage from '~/test/page-objects/phone-number.page.js'
import policyStartDatePage from '~/test/page-objects/policy-start-date.page.js'
import selectNoOfUnicornsPage from '~/test/page-objects/select-no-of-unicorns.page.js'
import selectTypeOfUnicornsPage from '~/test/page-objects/select-type-of-unicorns.page.js'
import unicornsTextPage from '~/test/page-objects/unicorns-text.page.js'
import uploadFilePage from '~/test/page-objects/upload-file.page.js'

/**
 * Answers every question of the e2e form - v2, from the name page to the
 * summary page.
 * @param {string} name - the answer to the name question
 */
export async function completeE2eFormV2(name) {
  await nameEntryPage.openV2()
  await expect(browser).toHaveTitle(
    `What's your name? - e2e form - v2 - GOV.UK`
  )
  await nameEntryPage.enterName.setValue(name)
  await nameEntryPage.submitButton.click()

  await expect(browser).toHaveTitle(
    `What's your email address? - e2e form - v2 - GOV.UK`
  )
  await emailPage.enterEmail.setValue('john.doe@example.co.uk')
  await emailPage.submitButton.click()

  await expect(browser).toHaveTitle(
    `What's your phone number? - e2e form - v2 - GOV.UK`
  )
  await phoneNumberPage.enterPhoneNumber.setValue('07777777777')
  await phoneNumberPage.submitButton.click()

  await expect(browser).toHaveTitle(
    `What's your address? - e2e form - v2 - GOV.UK`
  )
  await addressPage.enterAddressLine1.setValue('1 High Street')
  await addressPage.enterTown.setValue('Townsville')
  await addressPage.enterPostcode.setValue('TS1 1ST')
  await addressPage.submitButton.click()

  await expect(browser).toHaveTitle(
    'Do you want your unicorn breeder certificate sent to this address? - e2e form - v2 - GOV.UK'
  )
  await certificateAddressPage.selectYesOrNo.click()
  await certificateAddressPage.submitButton.click()

  await expect(browser).toHaveTitle(
    'When does your unicorn insurance policy start? - e2e form - v2 - GOV.UK'
  )
  await policyStartDatePage.enterDay.setValue('01')
  await policyStartDatePage.enterMonth.setValue('02')
  await policyStartDatePage.enterYear.setValue('2024')
  await policyStartDatePage.submitButton.click()

  await expect(browser).toHaveTitle(
    'Upload your insurance certificate - e2e form - v2 - GOV.UK'
  )
  const remoteFilePath = await browser.uploadFile(
    path.resolve('test/file/test-file.txt')
  )
  await uploadFilePage.chooseFile.setValue(remoteFilePath)
  await expect(uploadFilePage.checkForUploadedFile).toBeDisplayed()
  await uploadFilePage.submitButton.click()

  await expect(browser).toHaveTitle(
    'How many unicorns do you expect to breed each year? - e2e form - v2 - GOV.UK'
  )
  await selectNoOfUnicornsPage.select1to5.click()
  await selectNoOfUnicornsPage.submitButton.click()

  await expect(browser).toHaveTitle(
    'What type of unicorns will you breed? - e2e form - v2 - GOV.UK'
  )
  await selectTypeOfUnicornsPage.selectFlying.click()
  await selectTypeOfUnicornsPage.selectAquatic.click()
  await selectTypeOfUnicornsPage.submitButton.click()

  await expect(browser).toHaveTitle(
    'Where will you keep the unicorns? - e2e form - v2 - GOV.UK'
  )
  await unicornsTextPage.enterWhereYouKeepUnicorn.setValue(
    'unicorns are kept in the garden'
  )
  await unicornsTextPage.submitButton.click()

  await expect(browser).toHaveTitle(
    'How many members of staff will look after the unicorns? - e2e form - v2 - GOV.UK'
  )
  await noOfUnicornsStaffPage.enterNoOfUnicornStaff.setValue('5')
  await noOfUnicornsStaffPage.submitButton.click()

  await expect(browser).toHaveTitle(
    'Check your answers before sending your form - e2e form - v2 - GOV.UK'
  )
}
