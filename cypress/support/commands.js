/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable no-console */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

const actions = require("../common");
import axios from 'axios'

import 'cypress-file-upload';

import hasElement from "./hasElement";
Cypress.Commands.add("hasElement", hasElement);

require('cypress-iframe');

//rarebreed
const LOGIN_SPAN = "#email_login";
const LOGIN_EMAIL_FIELD = "#login_email";
const LOGIN_PASSWORD_FIELD = "#login_password";
const LOGIN_BUTTON = '.login_form > .itcss-button';
const REGISTER_BUTTON = '#register';
const REGISTER_FIRST_NAME_FIELD     = '#registration_form li.step1 #sFirstName';
const REGISTER_LAST_NAME_FIELD      = '#registration_form li.step1 #sLastName';
const REGISTER_EMAIL_ADDRESS_FIELD  = '#registration_form li.step1 #sEmailAddress';
const REGISTER_PASSWORD_FIELD       = '#registration_form li.step1 #sPasswordNew';
const REGISTER_STEP1_NEXT_BUTTON    = '#registration_form li.step1 .itcss-button';
const REGISTER_PAYROLL_NUMBER_FIELD = '#registration_form li.step2 #sLicence';
const REGISTER_DOB_DAY_FIELD        = '#registration_form li.step2 #sDateOfBirth_day';
const REGISTER_DOB_MONTH_FIELD      = '#registration_form li.step2 #sDateOfBirth_month';
const REGISTER_DOB_YEAR_FIELD       = '#registration_form li.step2 #sDateOfBirth_year';
const REGISTER_STEP2_NEXT_BUTTON    = '#registration_form li.step2 .itcss-button';
const REGISTER_GENDER_FIELD         = '#registration_form li.step3 #sGender_M';
const REGISTER_POSTCODE_FIELD       = '#registration_form li.step3 #sPostalCode';
const REGISTER_COMMS_FIELD          = '#registration_form li.step3 #sComms';
const REGISTER_TNC_FIELD            = '#registration_form li.step3 #bTermsAndConditions';
const REGISTER_STEP3_NEXT_BUTTON    = '#registration_form li.step3 .itcss-button';
const REGISTER_SUCCESS_HOLDER       = '.message-success-2 > :nth-child(2) > :nth-child(2)';
const RM_EMAIL_FIELD = "#email";
const RM_PASSWORD_FIELD = "#password";
const RM_LOGIN_BUTTON = ".button_new";
const PASSWORD_FIELD = ':nth-child(7) > .InputFloatingLabel__StyledInput-j02spn-1';
const PASSWORD = 'P4sSW0rD12345_';
const CONFIRM_PASSWORD_FIELD = ':nth-child(9) > .InputFloatingLabel__StyledInput-j02spn-1';
const PHONE_NUMBER_FIELD = ':nth-child(10) > .InputFloatingLabel__StyledInput-j02spn-1';
const PHONE_NUMBER = '0794100200300';
const NEXT_BUTTON = '.ShinyButton__ButtonEffect-sc-10p3dzr-2';
const COMPANY_NAME_TITLE = '.Title-sc-12jvmul-0';
const POST_CODE_FIELD = ':nth-child(7) > .InputFloatingLabel__StyledInput-j02spn-1';
const ADDRESS_LINE_ONE_FIELD = ':nth-child(8) > .InputFloatingLabel__StyledInput-j02spn-1';
const ADDRESS_LINE_2_FIELD = ':nth-child(9) > .InputFloatingLabel__StyledInput-j02spn-1';
const CITY_FIELD = ':nth-child(10) > .InputFloatingLabel__StyledInput-j02spn-1';
const SITE_DETAILS_TITLE = '.Title-sc-12jvmul-0';
const DOMAIN_NAME_FIELD = '.InputFloatingLabel__StyledInput-j02spn-1';
const DOMAIN_NAME_CONFIRM_FIELD = ':nth-child(4) > p > .Summary__HighlightedText-sc-1urw2tf-3';



Cypress.Commands.add("iframe", {
    prevSubject: "element"
}, $iframe => {
    return new Cypress.Promise(resolve => {
        $iframe.on("load", () => {
            resolve($iframe.contents().find("body"));
        });
    });
});

Cypress.Commands.add("getIframeElement", (selector, name) => {
    cy.get(selector)
        .then($iframe => {
            const $doc = $iframe.contents();
            return cy.wrap($doc[0].body);
        })
        .find(name)
        .first();
});

Cypress.Commands.add("selectNth", (select, pos) => {
    cy.get(`${select} option +option`)
        .eq(pos)
        .then(e => {
            cy.get(select).select(e.val());
        });
});

Cypress.Commands.add("fastLogin", () => {
    setDeviceCookies();
    cy.request({
        method: "GET",
        url: "https://site1.rewardgateway.dev/Authentication/StartLogin?idp=76"
    }).then(response => {
        cy.log("Login", response.statusText);
    });
});

Cypress.Commands.add("fastLogout", () => {
    cy.visit(Cypress.env("baseUrl") + "/Authentication/Logout");
});

Cypress.Commands.add("loginToUi", (email, password) => {
    cy.visit("")
        .get(LOGIN_SPAN)
        .click()
        .get(LOGIN_EMAIL_FIELD)
        .type(email)
        .get(LOGIN_PASSWORD_FIELD)
        .type(password)
        .get(LOGIN_BUTTON)
        .click()
        .location("pathname")
        .should("include", "/SmartSpending");
});

Cypress.Commands.add("registerStep1", (firstname, lastname, email, password) => {
    cy
        .visit(Cypress.env("baseUrl"))
        .get(REGISTER_BUTTON)
        .click()
        .get(REGISTER_FIRST_NAME_FIELD)
        .type(firstname)
        .get(REGISTER_LAST_NAME_FIELD)
        .type(lastname)
        .get(REGISTER_EMAIL_ADDRESS_FIELD)
        .type(email)
        .get(REGISTER_PASSWORD_FIELD)
        .type(password)
        .get(REGISTER_STEP1_NEXT_BUTTON)
        .click()
});

Cypress.Commands.add("registerStep2", (payroll, dobDay, dobMonth, dobYear) => {
    cy
        .get(REGISTER_PAYROLL_NUMBER_FIELD)
        .type(payroll)
        .get(REGISTER_DOB_DAY_FIELD)
        .select(dobDay, { force: true })
        .get(REGISTER_DOB_MONTH_FIELD)
        .select(dobMonth, { force: true })
        .get(REGISTER_DOB_YEAR_FIELD)
        .select(dobYear, { force: true })
        .get(REGISTER_STEP2_NEXT_BUTTON)
        .click()
});

Cypress.Commands.add("registerStep3", (postcode) => {
    cy
        .get(REGISTER_GENDER_FIELD)
        .check()
        .get(REGISTER_POSTCODE_FIELD)
        .type(postcode)
        .get(REGISTER_COMMS_FIELD)
        .check()
        .get(REGISTER_TNC_FIELD)
        .check()
        .get(REGISTER_STEP3_NEXT_BUTTON)
        .click()
        .get(REGISTER_SUCCESS_HOLDER)
        .should("contain", "Thanks for registering!")
});

Cypress.Commands.add("loginToRewardManager", (email, password) => {
    Cypress.config("baseUrl", null);
    cy.visit(Cypress.env("rmBaseUrl"))
        .get(RM_EMAIL_FIELD)
        .type(email)
        .get(RM_PASSWORD_FIELD)
        .type(password)
        .get(RM_LOGIN_BUTTON)
        .click()
        .url()
        .should("contain", "/admin/Home");
});

Cypress.Commands.add("sendRequest", (method, url, headers, body) => {
    cy.request({
        method: method || "GET",
        url: url,
        headers: headers,
        body: body
    }).then(response => {
        cy.log(response.statusText);
    });
});

Cypress.Commands.add("getAuthToken", () => {
    const formData = new FormData()
    formData.set('client_id', 'SF_hHsJtk81119RNtQkX4kwO5f18IMfmf')
    formData.set("client_secret", "SF_MnWzzcFvF0B8pMNsBaEXzb6khiFi8i");
    formData.set('grant_type', 'password')
    formData.set('username', '1')
    formData.set('password', "!1Password1!")
    formData.set('scope', 'programme.create')

    const options = {
        method: 'post',
        url: 'https://api.testing.aws.rewardgateway.net/auth/access_token',
        data: formData,
        headers: {
            Accept: 'application/vnd.rewardgateway+json;version=2.0',
        },
        validateStatus: () => true,
    }
    var res = axios(options)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error
        });
    return res
});

Cypress.Commands.add("createScheme", (memberId, accessToken) => {

    const date = actions.getDate()
    var raw = JSON.stringify({
        "name": "Cypress Test Company " + date,
        "companyName": "Cypress " + date,
        "companyLegalName": "Cypress Legal",
        "accountId": actions.getRandomSalesForceID(),
        "emailDomain": "rewardgateway.com",
        "schemeType": "rarebreed",
        "postalCode": "SM4 4AF",
        "addressLine1": "84A Martin Way",
        "user": {
            "id": memberId,
            "firstName": "RobinRB",
            "lastName": "MiklinskiRB",
            "email": "robin.miklinski+00001@rewardgateway.com",
            "verificationCode": 123456
        }
    });

    return cy.request({
        method: 'POST',
        url: 'https://api.testing.aws.rewardgateway.net/scheme',
        headers: {
            "Accept": "application/vnd.rewardgateway+json;version=3",
            "Content-Type": "application/json",
            "Authorization": accessToken
        },
        body: raw,
    })
})

const CARD_NUMBER_FIELD = "#id=number";
const EXPIRY_DATE_FIELD = "#id=exp_month";
const CVV_FIELD = "#id=cvv";
const NEXT_BUTTON_SUMMARY = ".ShinyButton__ButtonEffect-sc-10p3dzr-2";
const NEXT_BUTTON_LASTSTEPS = ".cb-button__text";
//const NEXT_BUTTON_FINAL = ".cb-button__text";
//const CHECKBOX = "div[name=acceptTerms]";
Cypress.Commands.add("verificationAndBilling", (memberUuid, verificationCode) => {
    const verificationUrl = Cypress.env('rarebreedTestUrl') + '/?member_id=' + memberUuid + '&code=' + verificationCode
    cy
        .visit(verificationUrl)
        .title().should('eq','Reward Gateway for Small Business')
        .get(PASSWORD_FIELD)
        .type(PASSWORD)
        .wait(1)
        .get(CONFIRM_PASSWORD_FIELD)
        .type(PASSWORD)
        .wait(1)
        .get(PHONE_NUMBER_FIELD)
        .type(PHONE_NUMBER)
        .get(NEXT_BUTTON)
        .click()
        .get(COMPANY_NAME_TITLE)
        .should('contain', 'Company Details')
        .get(POST_CODE_FIELD)
        .type('NW10 7HQ')
        .get(ADDRESS_LINE_ONE_FIELD)
        .type('1 Cypress Hill')
        .get(ADDRESS_LINE_2_FIELD)
        .type('Sugar Hill baby')
        .get(CITY_FIELD)
        .type('London')
        .get(NEXT_BUTTON)
        .click()
        .get(SITE_DETAILS_TITLE)
        .should('contain', 'Site details')
        .get(DOMAIN_NAME_FIELD)
        .type('cypresstest' + actions.shortid())
        .get(NEXT_BUTTON)
        .click()
        .get(DOMAIN_NAME_CONFIRM_FIELD)
        .should('contain', 'cypresstest')
        .get(NEXT_BUTTON_SUMMARY)
        .click()
        .get('.Checkbox__Wrapper-sc-190yqoe-0')
        .check()
        .get('.ShinyButton__ButtonEffect-sc-10p3dzr-2')
        .click()
        .get(CARD_NUMBER_FIELD)
        .type("4242424242424242")
        .get(EXPIRY_DATE_FIELD)
        .type("122029")
        .get(CVV_FIELD)
        .type("123")
        .get(NEXT_BUTTON_LASTSTEPS)
        .click()
        .get(NEXT_BUTTON_LASTSTEPS)
        .click()


});


Cypress.Commands.add("form_request", (url) => {

    var formData = new FormData();
    formData.append("client_id", "SF_hHsJtk81119RNtQkX4kwO5f18IMfmf");
    formData.append("client_secret", "SF_MnWzzcFvF0B8pMNsBaEXzb6khiFi8i");
    formData.append("scope", "programme.create");
    formData.append("username", "1");
    formData.append("password", "!1Password1!");
    formData.append("grant_type", "password");

    return cy
        .server()
        .route("POST", url)
        .as("formRequest")
        .window()
        .then(win => {
            var xhr = new win.XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.open('POST', url);
            xhr.setRequestHeader("Accept", "application/vnd.rewardgateway+json; version=2.0");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(formData);
        })
        .wait("@formRequest");
});


Cypress.Commands.add("scheme", (url, body) => {
    return cy
        .request({
            url: url,
            method: "POST",
            body: body
        })
        .then(({
            body
        }) => {
            return body;
        });
});

Cypress.Commands.add("formrequest", (method, url, formData, done) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.send(formData);
    xhr.onload = () => done();
    xhr.onload = function () {
        done(xhr);
        cy.log(xhr.responseText);
    };
    xhr.onerror = function () {
        done(xhr);
    };
});

function setDeviceCookies() {
    cy.setCookie("d_f_a_t", "1560343980");
    cy.setCookie(
        "d_f_i",
        "9c15ad5c255e22949c1d49c31909c551-f557666748da4e85ccb8"
    );
}

Cypress.Commands.add("selectNth", (select, pos) => {
    cy.get(`${select} option +option`)
        .eq(pos)
        .then(e => {
            cy.get(select).select(e.val());
        });
});