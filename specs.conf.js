/**
 * Selects the specs for the save-and-exit flow that forms-runner has in the
 * environment. forms-runner reads the same USE_SIGN_IN_FEATURE flag.
 * @returns {(string | string[])[]} the specs for the wdio config
 */
export function selectSpecs() {
  const commonSpecs = ['./test/specs/*.e2e.js', './test/specs/*.a11y.js']

  if (process.env.USE_SIGN_IN_FEATURE === 'true') {
    // One group runs in one worker and one browser, in this order, so the
    // later specs use the session from the sign-in spec
    return [
      ...commonSpecs,
      [
        './test/specs/sign-in/sign-in.e2e.js',
        './test/specs/sign-in/save-and-resume.e2e.js',
        './test/specs/sign-in/sign-out.e2e.js'
      ]
    ]
  }

  return [...commonSpecs, './test/specs/memorable-word/*.js']
}
