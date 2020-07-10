/* eslint-disable cypress/no-unnecessary-waiting */
const common = require("../../common");

const SEND_AWARD_FROM_CHECKBOX = ':nth-child(6) > label > :nth-child(1) > .ez-checkbox';
const SEND_AWARD_FROM_FIELD = '#sSendAwardFrom';
const SEND_AWARD_FROM_SEARCH_RESULT = '#ui-id-2';
const ADD_VALUE_BUTTON = '.float_right > .button_new';
const SEND_BE_AWARD_BUTTON = ':nth-child(1) > .balance_and_btn > .balance_holder > .inner > .actions_holder > .button_new';
const CHOOSE_AWARD_OVERLAY = '.overlay';
const AWARD_MESSAGE_BOX = '#sMessage';
const BRONZE_AWARD = '#award_bronze_1';
const RECIPIENT_SEARCH_FIELD = ':nth-child(1) > .recipient_details_holder > .recipient_name_input > .name_recipient';
const CREDIT_CARD_PAYMENT_TYPE_RADIO = '.payment_main_options > .payment_type > .payment_item_holder > .ez-radio';
const PAYMENT_IFRAME = '#cko-iframe-id';
const CHECKOUT_PASSWORD_FIELD = '#txtPassword';
const PAY_NOW_BUTTON = '#payment > .button_new';
const SAVE_CARD_FIELD = '.save_details_box > .tooltip_block > input';
const MAKE_PAYMENT_BUTTON = '.float_right > .button_new';
const CHECKOUT_CONTINUE_BUTTON = '#txtButton';
const PRINT_AWARD = '[data-title="Print"] > .button_new';
const RESULT_TEXT = '.rounded_block_inner > .uppercase_element';
const POT_PAYMENT_TYPE_RADIO = ':nth-child(1) > .payment_type > .payment_item_holder > .ez-radio';

export function setupInstantAward(useCreditCard) {
    const IA_MESSAGE_TEXT = common.shortid();
    const iaBasketUrl = Cypress.env("rmBaseUrl") + "/index.php/admin/RewardRecognition/InstantAwards/Basket"

    cy.visit(iaBasketUrl)
        .get(SEND_BE_AWARD_BUTTON)
        .click()
        .get(CHOOSE_AWARD_OVERLAY)
        .click()
        .get(AWARD_MESSAGE_BOX)
        .type(IA_MESSAGE_TEXT)
        .get(SEND_AWARD_FROM_CHECKBOX)
        .click()
        .get(SEND_AWARD_FROM_FIELD)
        .type('helpdesk operator')
        .wait('@ajaxCall')
        .get(SEND_AWARD_FROM_SEARCH_RESULT)
        .should('be.visible')
        .click()
        .get(SEND_AWARD_FROM_SEARCH_RESULT)
        .should('not.be.visible')
        .get(ADD_VALUE_BUTTON)
        .click()
        .get(BRONZE_AWARD)
        .click()
        .get(MAKE_PAYMENT_BUTTON)
        .click()
        .get(RECIPIENT_SEARCH_FIELD)
        .type('helpdesk supervisor')
        .get(SEND_AWARD_FROM_SEARCH_RESULT)
        .should('be.visible')
        .click()
        .get(SEND_AWARD_FROM_SEARCH_RESULT)
        .should('not.be.visible')
        .get(MAKE_PAYMENT_BUTTON)
        .click()
    if (useCreditCard) {
        cy
            .get(CREDIT_CARD_PAYMENT_TYPE_RADIO)
            .click()
            .wait('@ajaxCall')
            .log("CREDIT CARD PAYMENT SELECTED")
            .should('not.be.enabled')
            .wait(2000);
    } else {
        cy
            .get(POT_PAYMENT_TYPE_RADIO)
            .click()
            .wait('@ajaxCall')
            .log("POT AWARD SELECTED")
            .get(PAY_NOW_BUTTON)
            .click()
            .wait(2000);
    }
}

export function completeAddressFields() {
    cy
        .get(addressFields('2'))
        .type('Robin')
        .get(addressFields('3'))
        .type('Miklinski')
        .get(addressFields('4'))
        .type('90 Westbourne Grove')
        .get(addressFields('6'))
        .type('London')
        .get(addressFields('7'))
        .type('London')
        .get(addressFields('8'))
        .type('W2 5RT')
        .get(SAVE_CARD_FIELD)
        .type('card')
        .get(PAY_NOW_BUTTON)
        .click();
}

export function addressFields(val) {
    return `.address_box > :nth-child(${val}) > input`
}

export function validateCreditCardAwardIsSent() {
    cy
        .get(CHECKOUT_PASSWORD_FIELD)
        .type('Checkout1!')
        .get(CHECKOUT_CONTINUE_BUTTON)
        .click()
        .get(RESULT_TEXT)
        .should('contain', 'Your awards have been sent')
        .get(PRINT_AWARD)
        .should('be.visible');
}

// function validateRewardIsReceived(username, password) {
//     cy.log(username + password)
//     cy.visit('/Authentication/Logout');
//     cy.loginToUi(username, password)
// }

export function addIframeCardInfo() {
    cy  
        .wait(2000)
        .getIframeElement(PAYMENT_IFRAME, 'input:eq(0)')
        .should('be.visible')
        .type("4242424242424242")
        .getIframeElement(PAYMENT_IFRAME, 'input:eq(1)')
        .type('12')
        .wait(500)
        .getIframeElement(PAYMENT_IFRAME, 'input:eq(2)')
        .wait(500)
        .type('24')
        .getIframeElement(PAYMENT_IFRAME, 'input:eq(3)')
        .type('100')


    // wait until Cypress resolve iFrame issues 

    // cy.get(PAYMENT_IFRAME)
    //     .iframe()
    //     .find('input:eq(0)')
    //     .should('be.visible')


    // cy.get(PAYMENT_IFRAME)
    //     .then(function ($iframe) {
    //         const $body = $iframe.contents().find('body');
    //         cy.wrap($body)
    //             .find('input:eq(0)')
    //             .type('4242424242424242')
    //             .should('be.visible')
    //         cy.wrap($body)
    //             .find('input:eq(1)')
    //             .type('12')
    //             .wait(500);
    //         cy.wrap($body)
    //             .find('input:eq(2)')
    //             .type('24')
    //             .wait(500);
    //         cy.wrap($body)
    //             .find('input:eq(3)')
    //             .type('100')
    //             .wait(500);
    //     });
}