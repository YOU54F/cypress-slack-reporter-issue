
generate-error:
	source .env && yarn run clear:reports && yarn run cy:run:error || make send-slack

generate-pass:
	source .env && yarn run clear:reports && yarn run cy:run:pass || make send-slack

generate-fail:
	source .env && yarn run clear:reports && yarn run cy:run:fail || make send-slack

send-slack:
	npx cypress-slack-reporter --vcs-provider bitbucket --ci-provider custom --report-dir 'cypress/reports/mocha' --video-dir 'cypress/videos' --custom-url 'https://go.testing.build.rg-cdn.net' --verbose true

robin-test:
	rm -rf ./cypress/reports/mocha && yarn cy:run:randr:pr || npx cypress-slack-reporter --vcs-provider bitbucket --ci-provider custom --report-dir 'cypress/reports/mocha' --video-dir 'cypress/videos' --custom-url 'https://go.testing.build.rg-cdn.net' --verbose true