/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable no-undef */
/// <reference types="cypress" />
const {
    loginWrongDetails
} = require("../../support/rgsbErrorHandlingSupport");
const PASSWORD = 'P4sSW0rD12345_';
const LOGO_LINK = '#logo > img';
const ACCOUNT_SLINDOUT = ':nth-child(3) > .trigger-slideout';
const LOGOUT_LINK = ':nth-child(4) > .slideout-link';
const LOGIN_AGAIN = '.button';
//LoginPage
const LoginPage_LOGIN_WITH_EMAIL_BUTTON = '#email_login > .login_btn_text';
const LoginPage_EMAIL_ADDRESS_FIELD = '#login_email';
const LoginPage_PASSWORD_FIELD = '#login_password';
const LoginPage_SUBMIT_BUTTON = '.itcss-button';
//Products
const RECOGNITION_WALL_PRODUCT = ':nth-child(4) > a > .main-link-text';
const RECOGNITION_WALL_TITLE = '.title > h2';
const WELLBEING_TITLE = 'h2';
const DISCOUNTS_TITLE = 'h1';



describe("All RG4SB Products", () => {
    before(() => {
        cy.clearCookies()
        cy.clearLocalStorage()
    });
    context('All RG4SB products', () => {
        it("Assert all RG4SB products", function () {
            
            cy
            .readFile('data.json')
            .then((file) => {
                cy
                    .visit('https://c' + file.DOMAIN_ID + '.testing.aws.rewardgateway.net')
                    .get(LoginPage_LOGIN_WITH_EMAIL_BUTTON).click()
                    .get(LoginPage_EMAIL_ADDRESS_FIELD).type(file.CA_EMAIL)
                    .get(LoginPage_PASSWORD_FIELD).type(PASSWORD)
                    .get(LoginPage_SUBMIT_BUTTON).click()
                    .title().should('eq', 'Reward Hub | Welcome to your Reward Hub')
                    .url().should('eq', 'https://c' + file.DOMAIN_ID + '.testing.aws.rewardgateway.net/SmartHub') 

                    .get(RECOGNITION_WALL_PRODUCT).click()
                    .get(RECOGNITION_WALL_TITLE).contains('Make someone feel special today!')

                    .get(LOGO_LINK).click()

                    .get('[href="https://c' + file.DOMAIN_ID + '.testing.aws.rewardgateway.net/WellbeingCentre?ref=m"]').click()
                    .get(WELLBEING_TITLE).contains('Wellbeing Centre')  
                    
                    .get('[href="https://c' + file.DOMAIN_ID + '.testing.aws.rewardgateway.net//MyRewards"]').click() 
                    .get(DISCOUNTS_TITLE).contains('Welcome back, Firstname!')

                    .get(ACCOUNT_SLINDOUT).click()
                    .get(LOGOUT_LINK).click()
                    .get(LOGIN_AGAIN).click()

                
            })       
            loginWrongDetails()
        })
    })
})