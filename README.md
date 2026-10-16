forms-smoke-test

Needs to have a form name - Do not use - Used for Automated Tests in your environment for the test to pass

The template to create a service that runs WDIO tests against an environment.

- [Scenarios](#scenarios)
- [Requirements](#requirements)
  - [Node.js](#nodejs)
- [Local](#local)
  - [Setup](#setup)
  - [Running local tests](#running-local-tests)
  - [Debugging local tests](#debugging-local-tests)
- [Production](#production)
  - [Debugging tests](#debugging-tests)
- [Licence](#licence)
  - [About the licence](#about-the-licence)

## Scenarios

Every run:

- Fill in and submit the e2e form (preview, draft)
- Fill in and submit the e2e form - v2 (preview, draft)
- Each page of both forms has no WCAG 2.2 AA accessibility errors, from the first question to the confirmation page

When `USE_SIGN_IN_FEATURE` is not `true`:

- Save the e2e form part way through, with an email address and a security question
- Each page of the save journey has no WCAG 2.2 AA accessibility errors

When `USE_SIGN_IN_FEATURE` is `true`:

- Sign in with an email address and a security code
- Give a phone number, on the first sign-in only
- See the form homepage when signed in
- Save the e2e form - v2 from the check your answers page, with no security question
- See the saved form on the homepage
- Continue the saved form from the homepage
- See all the saved answers on the check your answers page
- Sign out

## Local Development

### Setup

Install application dependencies:

```bash
npm install
```

Create 2 new form (if it doesn't exist)- Name should be `e2e form` and `e2e form - v2`

And upload form json from - [test/file/register-as-a-unicorn-breeder.json](register-as-a-unicorn-breeder.json)

Do the same V2 (migrated to new editor) version of this form using [test/file/register-as-a-unicorn-breeder-v2.json](register-as-a-unicorn-breeder-v2.json)

### Running local tests

Start application you are testing on the url specified in `baseUrl` [wdio.local.conf.js](wdio.local.conf.js)

```bash
npm run test:local
```

### Debugging local tests

```bash
npm run test:local:debug
```

## Production

### Running the tests

Tests are run from the CDP-Portal under the Test Suites section. Before any changes can be run, a new docker image must be built, this will happen automatically when a pull request is merged into the `main` branch.
You can check the progress of the build under the actions section of this repository. Builds typically take around 1-2 minutes.

The results of the test run are made available in the portal.

### Save and exit tests

forms-runner has 2 save-and-exit flows. Its `USE_SIGN_IN_FEATURE` flag selects one. This test suite reads a flag with the same name, and [specs.conf.js](specs.conf.js) selects the specs for that flow:

- Flag not set, or not `true`: the specs in [test/specs/memorable-word](test/specs/memorable-word). They save the form with an email address and a security question.
- Flag `true`: the specs in [test/specs/sign-in](test/specs/sign-in). They run in this order, in one browser, so that each spec uses the session of the sign-in spec:
  1. `sign-in.e2e.js` signs in.
  2. `save-and-resume.e2e.js` completes the e2e form - v2, saves it from the summary page, resumes it from the homepage, and then checks the answers on the summary page.
  3. `sign-out.e2e.js` signs out.

Set `USE_SIGN_IN_FEATURE` on this test suite to the same value as on forms-runner in that environment. [wdio.local.conf.js](wdio.local.conf.js) sets it to `true` for the local test harness.

### Sign-in test

[test/specs/sign-in/sign-in.e2e.js](test/specs/sign-in/sign-in.e2e.js) signs in as `smoke-test@example.forms.defra.gov.uk` through forms-runner, forms-identity-ui and forms-identity-api. No email is sent to that address: the test reads the security code from forms-identity-api.

The environment must have:

- `USE_SIGN_IN_FEATURE=true` on forms-runner and on this test suite
- `OTP_TEST_READ_SECRET` on forms-identity-api and on this test suite, with the same value
- `IDENTITY_API_URL` on this test suite, the URL of forms-identity-api in that environment (for example `https://forms-identity-api.prod.cdp-int.defra.cloud`)

[wdio.local.conf.js](wdio.local.conf.js) sets these values for the local test harness.

forms-identity-api locks the address for 2 hours after 5 requests for a code in 2 hours with no sign-in that completes. To continue before then, remove the address from the `otp-lockouts` collection of forms-identity-api in that environment.

## Requirements of CDP Environment Tests

1. Your service builds as a docker container using the `.github/workflows/publish.yml`
   The workflow tags the docker images allowing the CDP Portal to identify how the container should be run on the platform.
   It also ensures its published to the correct docker repository.

2. The Dockerfile's entrypoint script should return exit

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government licence v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable
information providers in the public sector to license the use and re-use of their information under a common open
licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
