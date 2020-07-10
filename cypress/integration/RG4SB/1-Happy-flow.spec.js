/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable no-undef */
/// <reference types="cypress" />
//RGSB
const {
    verificationFlowFieldValidations
} = require("../../support/rgsbErrorHandlingSupport");
//Create Account form
const CREATE_ACCOUNT_URL = 'http://rarebreed-dev-5534971-5534971.hs-sites.com/rarebreed-create-account'; 
const CA_PASSWORD = '#hs-pwd-widget-password';
const CA_PASS_VALUE = 'R43e8r33D!';
const CA_PASS_SUBMIT_BUTTON = '.hs-button';
const CA_FIRST_NAME_FIELD = 'input[name=firstname]';
const CA_FIRST_NAME = 'Firstname';
const CA_LAST_NAME_FIELD = 'input[name=lastname]';
const CA_LAST_NAME = 'Lastname';
const CA_EMAIL_FIELD = 'input[name=email]';
const CA_COMPANY_NAME_FIELD = 'input[name=company]';
const CA_COMPANY_REGISTRATION_NUMBER_FIELD = 'input[name=company_registration_number]';
const CA_COMPANY_NUMBER = '0234567';
const CA_PHONE_NUMBER_FIELD = 'input[name=phone]';
const CA_PHONE_NUMBER = '0787878787';
const CA_SUBMIT_BUTTON = 'input[type=submit]';
const CA_NUMBER_OF_EMPLOYEES_FIELD = 'input[name=sb_numberofemployees]';
const CA_STREET_ADDRESS_FIELD = 'input[name=address]';
const CA_CITY_FIELD = 'input[name=city]';
const CA_POSTAL_CODE_FIELD = 'input[name=zip]';
const CA_STREET_ADDRESS = 'Cypress Hill 18';
const CA_CITY = 'Liverpool';
const CA_POSTAL_CODE = 'M1 1AE';
const CA_NUMBER_OF_EMPLOYEES = '50';
var today = new Date();
var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
const CA_COMPANY_NAME = 'NewCompany '+ time + ' ' + Cypress.moment().format('MMM DD YYYY');
//Verificatoin flow
const PASSWORD = 'P4sSW0rD12345_';
const NEXT_BUTTON = '.ShinyButton__ButtonEffect-t435pu-2';
const ADDRESS_LINE_2 = 'Sugar Hill baby';
const SITE_DETAILS_TITLE = '.Title-sc-12jvmul-0';
const DOMAIN_NAME_FIELD = '.InputFloatingLabel__StyledInput-j02spn-1';
const DOMAIN_NAME_CONFIRM_FIELD = ':nth-child(4) > p > .Summary__HighlightedText-sc-1urw2tf-3';
const PRICE_UP = '.Summary__HighlightedText-sc-1urw2tf-3';
const PRICE_DOWN = '.Summary__BigText-sc-1urw2tf-4';
const TERMS_AND_CONDITIONS_CHECKBOX = '.Checkbox__Wrapper-sc-190yqoe-0';
const actions = require("../../common");
const CA_EMAIL = actions.rgsbGenerateEmail();
const DOMAIN_ID = actions.shortid().replace(/[^a-zA-Z ]/g, "");
//IFrame
const IFRAME_COUNTRY_DROPDOWN = '#country';
const IFRAME_ADDRESS_LINE_1_FIELD = '#line1';
const IFRAME_ADDRESS_LINE_2_FIELD = '#line2';
const IFRAME_CITY_FIELD = '#city';
const IFRAME_POSTCODE_FIELD = '#zip';
const IFRAME_TITLE = '#cb-header-title';
const CARD_NUMBER_FIELD = 'input[name=cc-number]';
const EXPIRY_MONTH_FIELD = '#exp_month';
const EXPIRY_YEAR_FIELD = '#exp_year';
const CVV_FIELD = 'input[name=cc-csc]';
const NEXT_BUTTON_SUMMARY = ".ShinyButton__ButtonEffect-t435pu-2";
const NEXT_BUTTON_NEXTSTEP = ".cb-button__text";
const NEXT_BUTTON_LASTSTEP = ".cb-button";
const PRICE_VALUE = '.bounce'
const ACCOUNT_INFO = ".cb-section.cb-summary";
const NEXT_BUTTON_TEXT_LASTSTEP = '.cb-button__text';
//Verification Success
const SUCCESS_TEXT = '.Typography__H1-sc-1rzqao-0';
const PROCEED_TO_LOGIN_BUTTON = '[data-test-id=successCTA]';
//LoginPage
const LoginPage_LOGIN_WITH_EMAIL_BUTTON = '#email_login > .login_btn_text';
const LoginPage_EMAIL_ADDRESS_FIELD = '#login_email';
const LoginPage_PASSWORD_FIELD = '#login_password';
const LoginPage_SUBMIT_BUTTON = '.itcss-button';
const PRIVACY_NOTICE_POPUP = '.itcss-box-header-title';
const PRIVACY_NOTICE_POPUP_BUTTON = '.tcpp-popup-actions > .itcss-button';
const ACCEPT_COOKIES_BUTTON = '#hs-eu-confirmation-button';
const CA_CONFIRMATION_MESSAGE = '.ctr > .widget-type-cell > .row-number-5 > .row-fluid > .span12';
//Iframe
const getIframeDocument = () => {
   return cy
   .get('#cb-frame')
    // Cypress yields jQuery element, which has the real
    // DOM element under property "0".
    // From the real DOM iframe element we can get
    // the "document" element, it is stored in "contentDocument" property
    // Cypress "its" command can access deep properties using dot notation
    // https://on.cypress.io/its
   .its('0.contentDocument').should('exist')
 }
 const getIframeBody = () => {
    // get the document
   return getIframeDocument()
    // automatically retries until body is loaded
   .its('body').should('not.be.undefined')
    // wraps "body" DOM element to allow
    // chaining more Cypress commands, like ".find(...)"
   .then(cy.wrap)
 }

describe("RegistrationSuite", () => {
    before(() => {
        cy.clearCookies()
        cy.clearLocalStorage()
    });
    context('Registration', () => {
        it("Create Account Form", function () {
            cy
                .visit(CREATE_ACCOUNT_URL)
                .get(CA_PASSWORD).type(CA_PASS_VALUE)
                .get(CA_PASS_SUBMIT_BUTTON).click()
                .title().should('eq', 'Small Business - Create Account')
                .get(ACCEPT_COOKIES_BUTTON).click()
                .get(CA_FIRST_NAME_FIELD).type(CA_FIRST_NAME)
                .get(CA_LAST_NAME_FIELD).type(CA_LAST_NAME)
                .get(CA_EMAIL_FIELD).type(CA_EMAIL)
                .get(CA_COMPANY_NAME_FIELD).type(CA_COMPANY_NAME)
                .get(CA_COMPANY_REGISTRATION_NUMBER_FIELD).type(CA_COMPANY_NUMBER)
                .get(CA_NUMBER_OF_EMPLOYEES_FIELD).clear().type(CA_NUMBER_OF_EMPLOYEES)
                .get(CA_PHONE_NUMBER_FIELD).type(CA_PHONE_NUMBER)
                .get(CA_STREET_ADDRESS_FIELD).type(CA_STREET_ADDRESS)
                .get(CA_CITY_FIELD).type(CA_CITY)
                .get(CA_POSTAL_CODE_FIELD).type(CA_POSTAL_CODE)
                .get(CA_SUBMIT_BUTTON).click()
                .get(CA_CONFIRMATION_MESSAGE)
                .should('contain', 'Thanks for submitting the form.')
                .wait(160000)
                .visit('http://rarebreed-dev-5534971-5534971.hs-sites.com/read-data')
                .get('input[name=password]')
                .type('s@9oD*M1g!L2#cyj')
                .get('.hs-button').click()
                .get('input[name="rg_verification_code"]')
                .invoke('val')
                .then((verificationCode) => {
                          cy
                            .get('input[name="member_uuid_original"]')
                            .invoke('val')
                            .then((memberUuid) => {
                                    cy.writeFile('data.json', {
                                    memberUuid: memberUuid,
                                    verificationCode: verificationCode,
                                    CA_EMAIL: CA_EMAIL,
                                    DOMAIN_ID: DOMAIN_ID.toLowerCase(),
                                    CA_COMPANY_NAME: CA_COMPANY_NAME
                                    })
                            })  
                    })  
                .wait(160000)
        })
        
        it("Verification flow", function () {

           verificationFlowFieldValidations()

                cy    
                    .get(SITE_DETAILS_TITLE)
                    .should('contain', 'Site details')
                    .wait(5000)
                cy
                    .readFile('data.json')
                    .then((file) => {
                        cy
                        .get(DOMAIN_NAME_FIELD)
                        .type('c' + file.DOMAIN_ID)
                        .get(NEXT_BUTTON)
                        .click()
                        .wait(1000)
                        .get(PRICE_UP)
                        .should('contain', '£6 per month')
                        .get(DOMAIN_NAME_CONFIRM_FIELD)
                        .should('contain', 'c' + file.DOMAIN_ID) 
                        .get(NEXT_BUTTON_SUMMARY)
                        .click()
                        .get(PRICE_DOWN)
                        .should('contain', '£6')
                        .get(TERMS_AND_CONDITIONS_CHECKBOX)
                        .click()
                        .get(NEXT_BUTTON_SUMMARY)
                        .click()
                        .wait(10000)
                        
                    getIframeBody().find(PRICE_VALUE).wait(2000).should('contain', '£6.00')
                    getIframeBody().find(IFRAME_ADDRESS_LINE_1_FIELD).wait(2000).click().type(CA_STREET_ADDRESS)
                    getIframeBody().find(IFRAME_TITLE).click().wait(500).click()
                    getIframeBody().find(IFRAME_ADDRESS_LINE_2_FIELD).wait(2000).click().type(ADDRESS_LINE_2)
                    getIframeBody().find(IFRAME_TITLE).click().wait(500).click()
                    getIframeBody().find(IFRAME_CITY_FIELD).wait(2000).click().type(CA_CITY)
                    getIframeBody().find(IFRAME_TITLE).click().wait(500).click()
                    getIframeBody().find(IFRAME_POSTCODE_FIELD).wait(2000).click().type(CA_POSTAL_CODE)
                    getIframeBody().find(IFRAME_TITLE).click().wait(500).click()
                    getIframeBody().find(IFRAME_COUNTRY_DROPDOWN).wait(2000).select('United Kingdom')
                    getIframeBody().find(NEXT_BUTTON_NEXTSTEP).wait(2000).click().wait(4000)
                    getIframeBody().find(CARD_NUMBER_FIELD).wait(2000).click().type('4242424242424242')
                    getIframeBody().find(IFRAME_TITLE).click().wait(500).click()
                    getIframeBody().find(EXPIRY_MONTH_FIELD).wait(2000).click().type("12")
                    getIframeBody().find(EXPIRY_YEAR_FIELD).wait(2000).click().type("2029")
                    getIframeBody().find(CVV_FIELD).wait(2000).click().type("123")
                    getIframeBody().find(NEXT_BUTTON_NEXTSTEP).wait(2000).click().wait(4000)
                    getIframeBody().find(PRICE_VALUE).should('contain', '£6.00')
                    getIframeBody().find(ACCOUNT_INFO).should('contain', CA_FIRST_NAME)
                    getIframeBody().find(ACCOUNT_INFO).should('contain', CA_LAST_NAME)
                    getIframeBody().find(ACCOUNT_INFO).should('contain', file.CA_EMAIL.slice(0, -9))
                    getIframeBody().find(ACCOUNT_INFO).should('contain', file.CA_COMPANY_NAME)
                    getIframeBody().find(ACCOUNT_INFO).should('contain', CA_STREET_ADDRESS)
                    getIframeBody().find(ACCOUNT_INFO).should('contain', CA_POSTAL_CODE)
                    getIframeBody().find(ACCOUNT_INFO).should('contain', CA_CITY)
                    getIframeBody().find(ACCOUNT_INFO).should('contain', ADDRESS_LINE_2)
                    getIframeBody().find(ACCOUNT_INFO).should('contain', 'United Kingdom')
                    getIframeBody().find(ACCOUNT_INFO).should('contain', 'ending 4242')
                    getIframeBody().find(NEXT_BUTTON_TEXT_LASTSTEP).should('contain', 'Pay £6.00 & subscribe')
                    getIframeBody().find(NEXT_BUTTON_LASTSTEP).wait(4000).click()

                    cy
                        .url().should('eq', 'https://rarebreed.testing.aws.rewardgateway.net/success')
                        .get(SUCCESS_TEXT).contains('Success!')
                        .get(PROCEED_TO_LOGIN_BUTTON).wait(220000).click()
                        .wait(2000)
                        .url().should('eq', 'https://c' + file.DOMAIN_ID + '.testing.aws.rewardgateway.net/')                   
                })
        })

        it("Sign in for first time", function () {    
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
                        .get(PRIVACY_NOTICE_POPUP).contains('Privacy Notice')
                        .get(PRIVACY_NOTICE_POPUP_BUTTON).click()     
                })           
        })
    })
})