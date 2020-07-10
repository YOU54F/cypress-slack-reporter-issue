
const randr = require("../../../support/RandR/recognition-wall");
const common = require("../../../common");

const SEND_ECARD_BUTTON = ".action-buttons > [value='ecard']";
const SELECT_CATEGORY_BUTTON = ".image-hover-overlay > .inner";
const MESSAGE_TEXT_AREA = "#selected_text";
const SEND_SHARE_BUTTON = "#share_send";
const WALL_POST_ITEMS = "#react-app > div > section";
const SKELETON_HOLDER = '.iPBBdj > [data-testid=skeleton]';
const ECARD_IMAGE = '#react-app > div > section > div:nth-child(1) > article > img';

const SKELETON_HOLDER_2 = 'section > .sc-jWBwVP > :nth-child(2) > [data-testid=skeleton]';
describe("Rewards & Recognition", () => {
    before(() => {
        cy.fixture("users/staging.user").as("user");
    });

    beforeEach(() => {
        cy.fastLogin();
        cy.server()
    });

    context("R&R eCards", () => {
        it("Should send and share an eCard to the wall", function () {
            const ECARD_MESSAGE_TEXT = common.shortid();
            randr
                .goToRecognitionWall();
            randr
                .sendRecognitionTo("helpdesk operator");
            cy
                .get(SEND_ECARD_BUTTON)
                .as('sendEcard')
                .click()
                .url()
                .should("include", "/makesomeoneHappy")
            cy
                .get(SELECT_CATEGORY_BUTTON)
                .click();
            cy
                .get(MESSAGE_TEXT_AREA)
                .type(ECARD_MESSAGE_TEXT)
                .get(SEND_SHARE_BUTTON)
                .click()
                .location("pathname")
                .should("include", "/SocialRecognition")
                .get(SEND_ECARD_BUTTON)
                .should('be.visible')
                .get(SKELETON_HOLDER)
                .should('not.be.visible')
                .get(SKELETON_HOLDER_2)
                .should('not.be.visible')
                .get(WALL_POST_ITEMS)
                .should('be.visible')
                .children()
                .first()
                .should("contain", ECARD_MESSAGE_TEXT)
                .get(ECARD_IMAGE)
                .should("be.visible");
        });
    });
});


