# cypress-web-tests

- Install Node JS and Yarn
	- **brew install node**
	- **brew install yarn**

## Install Dependencies
- From the root of this repo run:
	- **yarn install**

## Run Tests


- To open the Cypress UI and run tests in the browser: 
	
	- **yarn cy:open**
	
	
	
- To run all tests in the console
	
	- **yarn cy:run**

## Editing Tests
- Install VS Code 
	- https://code.visualstudio.com/
- with extensions
	- ESLint
	- Beautify
	- Microsoft Live Share
		- for remote pair programming
	

### Retrying Failed Tests

- Specify the number of times to retry a failed test in cypress.json:
```
{
 "env": {
  "RETRIES": 1
}
```

- To run individual tests within a .spec, use It.only:

---
```javascript
    context('Login', () => {
        it.only("Should login to site through UI", function () {
            cy.loginToUi(this.user.email, this.user.password)
        })
    })
```
---

## Tests running in CI

- https://go.testing.build.rg-cdn.net/go/pipelines#!/

## Documentation
- https://docs.cypress.io