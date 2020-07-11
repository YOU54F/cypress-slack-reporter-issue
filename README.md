# cypress-slack-reporter Issue #650

Run
- Yarn
- ```rm -rf ./cypress/reports/mocha && yarn cy:run:randr:pr && npx cypress-slack-reporter --vcs-provider bitbucket --ci-provider custom --report-dir 'cypress/reports/mocha' --video-dir 'cypress/videos' --custom-url 'https://go.testing.build.rg-cdn.net' --verbose true```
