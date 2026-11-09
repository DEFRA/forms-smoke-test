/**
 * Selects the specs for the wdio config
 * @returns {(string | string[])[]} the specs for the wdio config
 */
export function selectSpecs() {
  return [
    './test/specs/*.e2e.js',
    './test/specs/*.a11y.js',
    // One group runs in one worker and one browser, in this order, so each
    // spec starts with the session that the spec before it left
    [
      './test/specs/sign-in/sign-in.e2e.js',
      './test/specs/sign-in/save-and-resume.e2e.js',
      './test/specs/sign-in/sign-out.e2e.js',
      './test/specs/sign-in/save-when-signed-out.e2e.js'
    ]
  ]
}
