/* eslint-disable cypress/no-unnecessary-waiting */
const randr = require("../../../support/RandR/recognition-wall");
const actions = require("../../../common");
const email = require("../../../support/email");
const sql = require("../../../support/queryFromFile");

const SEND_AWARD_BUTTON = ".action-buttons > [value='instantaward']";
const MESSAGE_TEXT_AREA = "#selected_text";
const SUMMARY_BUTTON = "#summary_btn";
const POT_VALUE = ".box_title_value > .value > .value_number";
const RECIPIENT_SUMMARY = "a > .name";
const AWARD_SEND_PRIVATELY_BUTTON = "#award_send_private";
const AWARD_CHOSEN_BUTTON = ".award_chosen";
const AWARD_SUCCESSFULLY_SENT_HEADER = '.award-success h4';
const UNREGISTERED_MEMBER_FIRSTNAME = 'Joe';
const UNREGISTERED_MEMBER_LASTNAME = 'Bloggs';
const UNREGISTERED_MEMBER_FULLNAME = 'Joe Bloggs';
const UNREGISTERED_MEMBER_EMAIL = 'joe.bloggs@test.com';
const UNREGISTERED_MEMBER_PASSWORD = 'password';
const UNREGISTERED_MEMBER_PAYROLL = 'ABC0001';
const UNREGISTERED_MEMBER_DOB_DAY = '01';
const UNREGISTERED_MEMBER_DOB_MONTH = 'January';
const UNREGISTERED_MEMBER_DOB_YEAR = '1980';
const UNREGISTERED_MEMBER_POSTCODE = 'aa111aa';

describe("Rewards & Recognition", () => {
    before(() => {
        cy.fixture("users/user").as("user");
        sql.queryFromFile('cypress/fixtures/sql/remove_unregistered_members.sql');
        sql.queryFromFile('cypress/fixtures/sql/add_unregistered_members.sql');
    });

    beforeEach(() => {
        cy.server()
    });

    context("R&R Send and autoclaim an instant award to an unregistered member, this award should be viewable by the member after they register", () => {

        it("Clears all existing emails", function () {
            email.clearEmails();
        });

        it("Issues instant award to an unregistered member", function () {
            this.retries(0)
            const REWARD_MESSAGE_TEXT = actions.shortid();
            cy
                .fastLogin();
            cy
                .route({
                    url: '/AJAXUtility?**',
                }).as('ajaxCall')

            randr
                .goToRecognitionWall();
            randr
                .sendRecognitionToUnregisteredMember(UNREGISTERED_MEMBER_FULLNAME, UNREGISTERED_MEMBER_EMAIL, UNREGISTERED_MEMBER_PAYROLL);
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
                .should("contain", "Joe Bloggs")
                .get(POT_VALUE)
                .should("contain", "£")
                .get(AWARD_SEND_PRIVATELY_BUTTON)
                .click()
                .get(AWARD_SUCCESSFULLY_SENT_HEADER)
                .contains('Congratulations!')
                .fastLogout();

        });

        it("Checks email received", function () {
            email
                .hasBeenSentToWithSubjectLine(UNREGISTERED_MEMBER_EMAIL, 'You received an award!')
            });

        it("Performs registration steps", function () {
            cy
                .registerStep1(UNREGISTERED_MEMBER_FIRSTNAME, UNREGISTERED_MEMBER_LASTNAME, UNREGISTERED_MEMBER_EMAIL, UNREGISTERED_MEMBER_PASSWORD)
                .registerStep2(UNREGISTERED_MEMBER_PAYROLL, UNREGISTERED_MEMBER_DOB_DAY, UNREGISTERED_MEMBER_DOB_MONTH, UNREGISTERED_MEMBER_DOB_YEAR)
                .registerStep3(UNREGISTERED_MEMBER_POSTCODE);
            });
    });
});