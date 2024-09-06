import { browser, expect } from '@wdio/globals'
import signInPage from '../page-objects/signIn.page'

describe('Library', () => {
  it('should create a new form', async () => {
    await signInPage.open()
    await signInPage.signIn()

    await expect(browser).toHaveText('Forms library')

    await $('a[href = "/create"]').click()
    await expect(browser).toHaveText('Enter a name for your form')

    await $('#title').addValue('My new form')
    await $('button[type="submit"]').click()

    await expect(browser).toHaveText('Choose a lead organisation for this form')

    // Choose lead organisation for the form
    await $('#organisation-3').click()
    await $('input[type="submit"]').click()

    await expect(browser).toHaveText('Team details')
  })
})
