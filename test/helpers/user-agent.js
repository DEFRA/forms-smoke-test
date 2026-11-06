import { browser } from '@wdio/globals'

/**
 * Marker added to the User-Agent of every request the smoke test makes, so
 * test traffic can be told apart from real traffic in the logs.
 */
export const SMOKE_TEST_USER_AGENT = 'smoke-test'

/**
 * Appends the smoke test marker to Chrome's own User-Agent rather than
 * replacing it, so the browser still looks like Chrome to the services it
 * visits. The override lasts for the session's current tab.
 */
export async function appendSmokeTestUserAgent() {
  const userAgent = await browser.execute(() => navigator.userAgent)

  await browser.sendCommandAndGetResult('Emulation.setUserAgentOverride', {
    userAgent: `${userAgent} ${SMOKE_TEST_USER_AGENT}`
  })
}
