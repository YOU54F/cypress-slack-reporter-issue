const common = require("../../../common");
const randr = require("../../../support/RandR/rm-instant-awards");


const CANCEL_CONFIRM = '.transaction_history_table > :nth-child(2) > :nth-child(1) > :nth-child(2)';
const REMOVE_CONFIRM_BUTTON = 'form > .button_new_green';
const REMOVE_BUTTON = '.remove_btn';
const CANCEL_AWARD_BUTTON = ':nth-child(3) > .card_details_container > .sub_pot_details > :nth-child(8) > .further_link > :nth-child(1)';
const BALANCE_VALUE = '#balance_total > strong';
const POT_AWARD_SENT_CONFIRM_MESSAGE = '.rounded_block_inner > .uppercase_element';
const CANCELLATION_REASON_TEXTBOX = 'textarea';

describe("Rewards & Recognition", () => {
    before(() => {
        cy.fixture("users/user").as("user");
    });

    beforeEach(() => {
        cy.task('queryDb', 'DELETE FROM `rrinstantawardsbasket`')
        cy.task('queryDb', 'DELETE FROM `rrtransactionaccount`')
        cy.task('queryDb', 'DELETE FROM `rrtransactionclaim`')
        cy.task('queryDb', 'DELETE FROM `orders`')
        cy.task('queryDb', 'DELETE FROM `orderupdates`')
        cy.server()
    });

    context("Reward Manager, Instant Awards", () => {
        it("Should pay for instant award with credit card from Reward Manager", function () {
            cy
                .route({
                    url: '/index.php/**',
                })
                .as('ajaxCall');
            cy
                .loginToRewardManager(this.user.be_email, this.user.be_password);
            randr
                .setupInstantAward(true)
            randr
                .addIframeCardInfo()
            randr
                .completeAddressFields()
            randr
                .validateCreditCardAwardIsSent();
            //validateRewardIsReceived('helpdesk.supervisor@rewardgateway.com', 'password')
        });

        it("Should cancel an Instant Award and refund the pot balance", function () {
            cy
                .route({
                    url: '/index.php/**',
                })
                .as('ajaxCall')
            cy
                .loginToRewardManager(this.user.be_email, this.user.be_password);

            const rmUrl = Cypress.env("rmBaseUrl")
            const manageAwardPotsUrl = rmUrl + '/index.php/admin/RewardRecognition/InstantAwards/ManageSubPots/index/13.html'
            cy
                .visit(manageAwardPotsUrl)
                .get(BALANCE_VALUE)
                .invoke('text')
                .then(balance1 => {
                    cy
                        .log("pot balance before award: " + balance1)
                    randr
                        .setupInstantAward(false);
                    cy
                        .get(POT_AWARD_SENT_CONFIRM_MESSAGE)
                        .should('contain', 'Your awards have been sent')
                        .click()
                    cy
                        .visit(rmUrl + '/index.php/admin/RewardRecognition/InstantAwards/OrderHistory/index/13.html')
                        .get(CANCEL_AWARD_BUTTON)
                        .click()
                        .get(REMOVE_BUTTON)
                        .click()
                        .get(CANCELLATION_REASON_TEXTBOX)
                        .type('Cypress award cancellation')
                        .get(REMOVE_CONFIRM_BUTTON)
                        .should('be.visible')
                        .click()
                        .get(CANCEL_CONFIRM)
                        .should('contain', 'Cancelled')
                        .visit(manageAwardPotsUrl)
                        .get(BALANCE_VALUE)
                        .invoke('text')
                        .then(balance2 => {
                            expect(common.parseInt(balance1)).to.equal(common.parseInt(balance2))
                            cy
                                .log('balance after award refunded: ' + balance2)
                        });
                });
        });
    });
});