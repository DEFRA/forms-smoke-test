import { Page } from 'page-objects/page'

class SignInPage extends Page {
  open() {
    return super.open(process.env.APP_BASE_URL + '/library')
  }

  getSignInButton() {
    return $('button=Sign in')
  }

  async signIn() {
    await $('input[type="email"]').addValue(process.env.TEST_USERNAME)
    await $('input[type="submit"]').click()
    await $('input[type="password"]').addValue(process.env.TEST_PASSWORD)
    await $('input[type="submit"]').click()
    await $('input[type="submit"]').click()
  }
}

export default new SignInPage()
