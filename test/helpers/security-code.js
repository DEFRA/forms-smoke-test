const { ENVIRONMENT = '', IDENTITY_API_URL, OTP_TEST_READ_SECRET } = process.env

const identityApiUrl =
  IDENTITY_API_URL ??
  `https://forms-identity-api.${ENVIRONMENT}.cdp-int.defra.cloud`

/**
 * Reads the sign-in security code that forms-identity-api keeps for a test
 * address. The service sends no email to a test address, so this read is how
 * the test gets the code that a person would get by email.
 * @param {string} email - an address at the test email domain
 * @returns {Promise<string>} the security code
 */
export async function readSecurityCode(email) {
  if (!OTP_TEST_READ_SECRET) {
    throw new Error('OTP_TEST_READ_SECRET is not set')
  }

  const response = await fetch(
    `${identityApiUrl}/test/otp/${encodeURIComponent(email)}/SIGNIN_VERIFY_EMAIL`,
    { headers: { Authorization: `Bearer ${OTP_TEST_READ_SECRET}` } }
  )

  if (!response.ok) {
    throw new Error(
      `forms-identity-api gave status ${String(response.status)} for the security code of ${email}`
    )
  }

  const body = await /** @type {Promise<{ code: string }>} */ (response.json())

  return body.code
}
