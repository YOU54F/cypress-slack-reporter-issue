/* eslint-disable cypress/no-unnecessary-waiting */
const MEMBER_SEARCH_FIELD = ".tagitfield > .tagit-new > .ui-widget-content";
const RECIPIENT_SEARCH_RESULTS = '.highlight_wrap > :nth-child(2)';
const SELECTED_RECIPIENT = ".tagit-label";
const LOADER_ANIMATION = '#ui-id-1 > .itcss-loader > .itcss-loader-container > .itcss-loader-animation > .dot3';
const RECIPIENT_CLASS = "tagit-label";
const ADD_COMMENT_BUTTON = ".js-toggle-comments > strong";
const COMMENT_BOX = ".fr-element > p";
const COMMENT_BUTTON = ".itcss-button";
const ADDED_COMMENT_TEXT = ".comments-user-text-inner > p";
const WALL_POST_ITEMS = "#react-app > div > section";
const DELETE_COG = ".icon-cog";
const REMOVE_WALL_POST = ".remove_post";
const ACCEPT_DELETE_POST = ".accept_deleting";

const UNREGISTERED_RECIPIENT_SEARCH_RESULTS = 'ul.tagit-autocomplete > li:last-child';
const ADD_RECIPIENT_FORM = '.no-results-form';
const ADD_RECIPIENT_FULLNAME_FIELD = '.no-results-form input[name=fullname]';
const ADD_RECIPIENT_EMAIL_FIELD = '.no-results-form input[name=email]';
const ADD_RECIPIENT_PAYROLL_FIELD = '.no-results-form input[name=payroll]';
const ADD_RECIPIENT_BUTTON = '.no-results-form button[type=submit]';
const ADD_RECIPIENT_FIELD_NOT_TO_EXIST = 'div[data-show="0"] > .itcss-input';

const SUMMARY_BUTTON = "#summary_btn";
const POT_VALUE = ".box_title_value > .value > .value_number";
const RECIPIENT_SUMMARY = "a > .name";
const AWARD_SEND_SHARE_BUTTON = "#award_send_share";
const SEND_AWARD_BUTTON = ".action-buttons > [value='instantaward']";
const MESSAGE_TEXT_AREA = "#selected_text";
const AWARD_CHOSEN_BUTTON = ".award_chosen";


export function goToRecognitionWall() {
    cy
        .visit("www.google.com")
        .location("pathname")
        .should("include", "/SocialRecognition");
}

export function sendRecognitionTo(recipient) {
    cy
        .route({
            url: '/AJAXUtility?**',
        }).as('ajaxCall');
    cy
        .get(MEMBER_SEARCH_FIELD)
        .type(recipient)
        .get(LOADER_ANIMATION)
        .should('be.visible')
        .wait('@ajaxCall')
        .get(RECIPIENT_SEARCH_RESULTS)
        .should('be.visible')
        .click();
    cy
        .get(SELECTED_RECIPIENT)
        .should("have.class", RECIPIENT_CLASS);
}


export function sendRecognitionToUnregisteredMember(recipientName, recipientEmail, recipientPayroll) {
    cy
        .route({
            url: '/AJAXUtility?**',
        }).as('ajaxCall');
    cy
        .get(MEMBER_SEARCH_FIELD)
        .type(recipientName)
        .get(LOADER_ANIMATION)
        .should('be.visible')
        .wait('@ajaxCall')
        .get(UNREGISTERED_RECIPIENT_SEARCH_RESULTS)
        .should('be.visible')
        .click();
    cy
        .get(ADD_RECIPIENT_FORM)
        .should("be.visible")
        .get(ADD_RECIPIENT_FULLNAME_FIELD)
        .type(recipientName)
        .get(ADD_RECIPIENT_EMAIL_FIELD)
        .type(recipientEmail)
        .get(ADD_RECIPIENT_PAYROLL_FIELD)
        .type(recipientPayroll)
        .get(ADD_RECIPIENT_BUTTON)
        .click()
        .get(ADD_RECIPIENT_FIELD_NOT_TO_EXIST)
        .should('not.be.visible')
    cy
        .get(SELECTED_RECIPIENT)
        .should("have.class", RECIPIENT_CLASS);
}


export function addCommentToWallPost(comment) {
    cy
        .route({
            url: '/comment/**',
        })
        .as('commentAjax');
    cy
        .get(WALL_POST_ITEMS)
        .children()
        .within(() => {
            cy
                .get(ADD_COMMENT_BUTTON)
                .click()
                .wait('@commentAjax')
                .get(COMMENT_BOX)
                .type(comment)
                .get(COMMENT_BUTTON)
                .click()
                .get(ADDED_COMMENT_TEXT)
                .should("contain", comment);
        });
}

export function deleteFirstWallPost() {
    cy
        .get(WALL_POST_ITEMS)
        .children()
        .first()
        .within(() => {
            cy
                .get(DELETE_COG)
                .click()
                .get(REMOVE_WALL_POST)
                .click();
        });
    cy
        .get(ACCEPT_DELETE_POST)
        .click();
}

export function sendInstantAward(REWARD_MESSAGE_TEXT) {
    cy
        .get(SEND_AWARD_BUTTON)
        .click()
        .get('.text')
        .contains("Choose this image")
        .click()
        .get(MESSAGE_TEXT_AREA)
        .type(REWARD_MESSAGE_TEXT)
        .get(AWARD_CHOSEN_BUTTON)
        .click()
        .wait(1000)
        .get(SUMMARY_BUTTON)
        .click()
        .get(RECIPIENT_SUMMARY)
        .should("contain", "Helpdesk")
        .get(POT_VALUE)
        .should("contain", "£")
        .get(AWARD_SEND_SHARE_BUTTON)
        .click()
        .location("pathname")
        .should("include", "/SocialRecognition");
}