forms-smoke-test

Needs to have a form name - Do not use - Used for Automated Tests in your environment for the test to pass

The template to create a service that runs WDIO tests against an environment.

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

### Sign-in test

[test/specs/sign-in.e2e.js](test/specs/sign-in.e2e.js) signs in as `smoke-test@example.forms.defra.gov.uk` through forms-runner, forms-identity-ui and forms-identity-api. No email is sent to that address: the test reads the security code from forms-identity-api.

The environment must have:

- `USE_SIGN_IN_FEATURE=true` on forms-runner
- `OTP_TEST_READ_SECRET` on forms-identity-api and on this test suite, with the same value
- `RUNNER_URL` on this test suite, the URL of forms-runner in that environment (for a local run, `http://localhost:3009`)
- `IDENTITY_API_URL` on this test suite, the URL of forms-identity-api in that environment (for example `https://forms-identity-api.prod.cdp-int.defra.cloud`, or `http://localhost:3010` for a local run)
- `IDENTITY_UI_URL` on this test suite, the URL of forms-identity-ui that forms-runner sends the browser to for sign-in (for a local run, `http://identity.127.0.0.1.sslip.io:3011`)

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
