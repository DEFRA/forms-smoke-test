const { IDENTITY_API_URL, OTP_TEST_READ_SECRET } = process.env

/**
 * Reads the sign-in security code that forms-identity-api keeps for a test
 * address.
 * @param {string} email - an address at the test email domain
 * @returns {Promise<string>} the security code
 */
export async function readSecurityCode(email) {
  if (!IDENTITY_API_URL) {
    throw new Error('IDENTITY_API_URL is not set')
  }

  if (!OTP_TEST_READ_SECRET) {
    throw new Error('OTP_TEST_READ_SECRET is not set')
  }

  const response = await fetch(
    `${IDENTITY_API_URL}/test/otp/${encodeURIComponent(email)}/SIGNIN_VERIFY_EMAIL`,
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
