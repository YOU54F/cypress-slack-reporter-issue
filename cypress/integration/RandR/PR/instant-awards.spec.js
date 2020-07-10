/* eslint-disable cypress/no-unnecessary-waiting */
const randr = require("../../../support/RandR/recognition-wall");
const actions = require("../../../common");

const WALL_POST_ITEMS = "#social_recognition_list";
const AWARD_ALERT_TEXT =
    ":nth-child(2) > .notification-list-item > .notification-list-item-content > .notification-list-item-title";
const COMMENT_ALERT_TEXT =
    ":nth-child(1) > .notification-list-item > .notification-list-item-content > .notification-list-item-title";
const ALERTS_DRAWER = ":nth-child(2) > .trigger-slideout > .svg-icon";

describe("Rewards & Recognition", () => {
    before(() => {
        cy.fixture("users/staging.user").as("user");
    });

    beforeEach(() => {
        cy.fastLogin();
        cy.server()
    });

    context("R&R Front end", () => {
        it("Should send and share an instant award to the wall and notify", function () {
            const REWARD_MESSAGE_TEXT = actions.shortid();
            cy
                .route({
                    url: '/AJAXUtility?**',
                }).as('ajaxCall')
            randr
                .goToRecognitionWall();
            randr
                .sendRecognitionTo("helpdesk operator");
            randr
                .sendInstantAward(REWARD_MESSAGE_TEXT);
            randr
                .goToRecognitionWall();
            cy
                .get(WALL_POST_ITEMS)
                .children()
                .first()
                .should("contain", REWARD_MESSAGE_TEXT);
            cy
                .get(".eCard_holder")
                .find("img")
                .should("be.visible");
            randr
                .addCommentToWallPost("Well done you");
            cy
                .fastLogout();
            cy
                .loginToUi("helpdesk.operator@rewardgateway.com", "password")
                .get(ALERTS_DRAWER)
                .click()
                .get(COMMENT_ALERT_TEXT)
                .should(
                    "contain",
                    "Your Instant  Award  1 has been commented on by Example User. Click now to see."
                )
                .get(AWARD_ALERT_TEXT)
                .should(
                    "contain",
                    "Instant  Award  1 has been sent to you by Example User! Click now to see it."
                )
                .click()
        });
    });
});