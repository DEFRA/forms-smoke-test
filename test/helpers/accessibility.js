import { AxeBuilder } from '@axe-core/webdriverio'
import { createHtmlReport } from 'axe-html-reporter'
import fs from 'node:fs'

/**
 * WCAG 2.2 Level AA — all applicable tag levels.
 * Tags are NOT cumulative in axe-core, so each level must be listed explicitly.
 */
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

/** Directory for per-page HTML reports */
const REPORT_DIR = 'accessibility-reports'

/**
 * Run an axe-core WCAG 2.2 AA scan on the current page.
 *
 * @param {import('webdriverio').Browser} browserInstance - The WDIO browser object
 * @param {string} pageName - Human-readable identifier (used in report filename and error messages)
 * @param {object} [options]
 * @param {string[]} [options.tags] - axe-core tags to check (default: WCAG 2.2 AA)
 * @param {string[]} [options.disableRules] - Rule IDs to skip
 * @param {string[]} [options.exclude] - CSS selectors to exclude from scan
 * @param {boolean}  [options.softAssert] - If true, log violations without throwing (default: false)
 * @returns {Promise<import('axe-core').AxeResults>}
 */
export async function checkAccessibility(
  browserInstance,
  pageName,
  options = {}
) {
  const {
    tags = WCAG_TAGS,
    disableRules = [],
    exclude = [],
    softAssert = false
  } = options

  let builder = new AxeBuilder({ client: browserInstance }).withTags(tags)

  if (disableRules.length) {
    builder = builder.disableRules(disableRules)
  }

  for (const selector of exclude) {
    builder = builder.exclude(selector)
  }

  const results = await builder.analyze()

  // Ensure report directory exists
  if (!fs.existsSync(REPORT_DIR)) {
    fs.mkdirSync(REPORT_DIR, { recursive: true })
  }

  // Generate per-page HTML report
  const sanitisedName = pageName.replaceAll(/[^a-z0-9-]/gi, '-').toLowerCase()

  createHtmlReport({
    results,
    options: {
      projectKey: 'Defra Forms Runner',
      outputDir: REPORT_DIR,
      reportFileName: `a11y-${sanitisedName}.html`
    }
  })

  // Surface violations
  const { violations } = results

  if (violations.length > 0) {
    const summary = violations
      .map(
        (v) =>
          `  [${v.impact ?? 'unknown'}] ${v.id}: ${v.help} (${String(v.nodes.length)} instance(s))\n` +
          `    → ${v.helpUrl}`
      )
      .join('\n')

    const message = `Accessibility violations on "${pageName}" (${String(violations.length)} rule(s) failed):\n${summary}`

    if (softAssert) {
      console.warn(`⚠ ${message}`)
    } else {
      throw new Error(message)
    }
  }

  return results
}
