/* eslint-disable cypress/no-unnecessary-waiting */
const actions = require("../../common");

const NOMINEE_NAME_FIELD = "#sName";
const SELECT_NOMINEE = '.ac_over';
const MESSAGE_TEXT_FIELD = "#sCustomQuestion55";
const SEND_NOMINATION_BUTTON = ".button_holder > .primary";
const NOMINATION_SUCCESS_MESSAGE = ".message-success";
const SEARCH_PROGRAMME_FIELD = "#sSchemeIdSource";
const SEARCH_PROGRAMME_RESULT = "#ui-id-2";
const ALL_NOMINATIONS_CHECKBOX = ".legacy";
const APPROVAL_ACTIONS_BUTTON = ".actions > :nth-child(1)";
const SELECT_FOR_APPROVAL = ".data_holder > .approve";
const APPROVE_ALL_YES = "form > .clearfix > .btn_actions > .yes";
const UNNAPROVED_NOMINATION_COUNT = ".number";
const SEARCH_PROGRAMME_BUTTON = ".itcss-button";
const NO_NOMINEE_RESULTS = ".no_results > td";
const LOADING_NOMINATIONS = '.load_more_btn';
const AWARD_CODE_TEXT = 'tbody > :nth-child(1) > :nth-child(7)';
const FIRST_DISPATCH_BUTTON = '.button-star';
const DISPATCH_IFRAME_DIALOG = '#dialog';
const DISPATCH_BATCH_IFRAME_BUTTON = 'div:nth-child(1) > form > div.block-footer > button';
const CLOSE_IFRAME_LINK = 'div:nth-child(1) > div > div.block-body > p > a';
const DISPATCH_BATCH_RESULT = '.block-header > p';
const APPROVE_NOMINATION_BUTTON = '[data-automation=approve-nomination]';
const AWARD_TYPE_DROPDOWN = '#select2-sAwardType-container';
const AWARD_TYPES = '#select2-sAwardType-results';
const PUSH_THE_BOUNDARIES_OPTION = '#scheme1 > span.select2-container.select2-container--default.select2-container--open > span > span.select2-results';
const AWARD_DROPDOWN = '#select2-sAwardType-container';
const AWARD_DROPDOWN_LAYER_2 = '#select2-sAwardType-container';
const REASON_DROPDOWN = '#select2-sCustomQuestion54-container';
const REASON_OPTION = '#select2-sCustomQuestion54-results > li:nth-child(2) > ul';
const LOADING_ICON = '.sc-bZQynM > div > svg';
const APPROVE_SELECTED_NOMINATIONS = '[data-automation="approve-selected"]';
const SELECT_ALL_NOMINATIONS = '[data-automation="select-all"]';
const NOMINATION_PAGE_TITLE = '#page_title > h1';

export function approveAllNominationsInRewardManager() {
    const rrConfigPage =
        Cypress.env("rmBaseUrl") + "/index.php/admin/MemberHome/SearchScheme/RewardRecognition:NominationsApprovals:RRSchemeListing.html";
    cy.visit(rrConfigPage)
        .get(SEARCH_PROGRAMME_FIELD)
        .type("Example Site")
        .get(SEARCH_PROGRAMME_RESULT)
        .click()
        .get(SEARCH_PROGRAMME_BUTTON)
        .click()
        .get(LOADING_NOMINATIONS)
        .should('not.be.visible')
    cy.get(ALL_NOMINATIONS_CHECKBOX)
        .click()
        .get(APPROVAL_ACTIONS_BUTTON)
        .should('be.visible')
        .click()
        .wait(2000)
        .get(SELECT_FOR_APPROVAL)
        .should('be.visible')
        .click()
        .wait(2000)
        .get(APPROVE_ALL_YES)
        .should('be.visible')
        .click()
        .wait(2000)
        .get(NO_NOMINEE_RESULTS)
        .should('be.visible')
        .should("contain", "You have no nominations yet :(")
        .wait(2000);
    cy.get(UNNAPROVED_NOMINATION_COUNT)
        .should("contain", "(0)");
    cy.visit(Cypress.env("rmBaseUrl") + '/index.php/admin/RewardRecognition/Batches/Dispatch')

        .get('.button-view')
        .click()
        .get(AWARD_CODE_TEXT)
        .invoke('text')
        .should(($awardcode) => {
            expect($awardcode).to.have.length(7)
        })
        .get(FIRST_DISPATCH_BUTTON)
        .click()
        .get(DISPATCH_IFRAME_DIALOG)
        .iframe()
        .getIframeElement(DISPATCH_IFRAME_DIALOG, DISPATCH_BATCH_IFRAME_BUTTON)
        .click()
        .wait(5000)
    cy.get(DISPATCH_IFRAME_DIALOG)
        .getIframeElement(DISPATCH_IFRAME_DIALOG, CLOSE_IFRAME_LINK)
        .click()
    cy.get(DISPATCH_BATCH_RESULT)
        .contains('This batch is being dispatched.')
    actions.runCronJob(117);
}
export function createNomination(nominee, message) {
    cy.visit(Cypress.env("baseUrl") + '/RewardScheme?sID=10')
        .get(NOMINATION_PAGE_TITLE)
        .contains('R&R Scheme Nomination')
        .get(NOMINEE_NAME_FIELD)
        .type(nominee)
        .wait('@ajaxCall')
        .get(SELECT_NOMINEE)
        .click()
        .get(AWARD_DROPDOWN)
        .type('{enter}')
        .get(AWARD_DROPDOWN_LAYER_2)
        .click()
        .get(PUSH_THE_BOUNDARIES_OPTION)
        .contains('Push the boundaries')
        .click()
        .get(REASON_DROPDOWN)
        .click()
        .get(REASON_OPTION)
        .children()
        .within(() => {
            cy
                .contains('You are a star')
                .click()
        });
    cy
        .get(MESSAGE_TEXT_FIELD)
        .type(message)
        .get(SEND_NOMINATION_BUTTON)
        .click()
        .get(NOMINATION_SUCCESS_MESSAGE)
        .should("contain", "Thank you for your nomination");
}
export function approveFrontEndNomination() {
    cy.visit(Cypress.env("baseUrl") + '/SocialRecognition/nominationsApprovals')
        .get(SELECT_ALL_NOMINATIONS)
        .click()
        .get(APPROVE_SELECTED_NOMINATIONS)
        .click()
        .get(LOADING_ICON)
        .should('not.be.visible')
        .get(APPROVE_NOMINATION_BUTTON)
        .should('have.length', 0)
}