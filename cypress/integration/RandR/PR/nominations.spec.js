const randr = require("../../../support/RandR/nominations-support");
const actions = require("../../../common");

const WALL_POST_ITEMS = "#react-app > div > section";
const NOMINATION_POST = ".nomination";

describe("Rewards & Recognition", () => {
    before(() => {
        cy.fixture("users/user").as("user");
    });
    beforeEach(() => {
        cy.fastLogin();
        cy.server()
    });

    context("R&R, Nominations", () => {
        const NOMINATION_MESSAGE_TEXT = actions.shortid();
        it("Should send and approve a nomination in Reward Manager", function () {
            cy
                .route({
                    url: '/AJAXUtility?**',
                })
                .as('ajaxCall')
            randr.createNomination('helpdesk operator', NOMINATION_MESSAGE_TEXT);
            cy.loginToRewardManager(this.user.be_email, this.user.be_password);
            randr.approveAllNominationsInRewardManager();
        });
        it("Should show approved nominations on the wall", function () {
            cy.visit(Cypress.env("baseUrl") + "/SocialRecognition")
                .get(WALL_POST_ITEMS)
                .should("be.visible");
            cy.get(WALL_POST_ITEMS)
                .children()
                .first()
                .within(() => {
                    cy.get(NOMINATION_POST)
                        .should("contain", "Push  the  boundaries");
                });
        });
        it("Should send and approve a nomination on the Front End", function () {
            cy
                .route({
                    url: '/AJAXUtility?**',
                })
                .as('ajaxCall')
            randr.createNomination('helpdesk operator', NOMINATION_MESSAGE_TEXT);
            randr.approveFrontEndNomination();
        });
    });
});
