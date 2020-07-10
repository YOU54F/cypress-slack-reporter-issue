/* eslint-disable cypress/no-unnecessary-waiting */
const {
    uploadFile
} = require("../../../support/fileUpload");

const sql = require("../../../support/queryFromFile");
const actions = require("../../../common");

const csvPath = 'csv/gen_anniversary.csv'

const FILE_UPLOAD_INPUT = 'input[type=file]';
const CONTINUE_BUTTON_2 = '.itcss-form-row > .itcss-button';
const REGISTRATION_CRITERIA_TYPE = '#sRegistrationCriteriaType';
const CONTINUE_BUTTON = '.block-footer > .button';
const TEMPLATE_NAME_FIELD = '#template_name';
const UPLOAD_ACTION_GRANT = '#upload_action_GRANT';
const SELECT_COMMS_TYPE = '#communication_type_2';
const UPLOAD_BUTTON = '.upload_button > .itcss-button';
const TEMPLATE_CONTINUE_BUTTON = '#template_setup';
const CONTINUE_BUTTON_3 = '.itcss-button';
const ADD_SCHEME_URL = Cypress.env("rmBaseUrl") + '/index.php/admin/Scheme/Add/1.html'
const CONFIGURE_TEMPLATE_URL = Cypress.env("rmBaseUrl") + '/index.php/admin/MemberHome/configureTemplate/1'
const CONFIRM_UPLOAD_BUTTON = '.upload-template-actions > .itcss-button';
const SUCCESS_MESSAGE_CLOSE = '.success_message_close';
const ROUNDED_BLOCK_BUTTON = '.rounded_block';
const CONFIRM_OPTION_BUTTON = '.btn-link-holder > .itcss-button';
const CONTINUE_BUTTON_4 = '.itcss-box-header';
const ALERTS_DRAWER = ":nth-child(2) > .trigger-slideout";
const NOTIFICATION_CONTAINER = '.notification-list-container';

describe("Rewards & Recognition", () => {
    before(() => {
        cy.fixture("users/user").as("user");
        sql.queryFromFile('cypress/fixtures/sql/anniversaries.sql');
        cy.exec('node ./cypress/fixtures/csv/csv.js')
        cy.log('ENV?')
    });
    beforeEach(() => {
        cy.server()
    });

    context("Anniversaries", () => {
        it("Should notify a manager of a member anniversary", function () {
            this.retries(1)

            const templateName = 'Anniversary Template-' + actions.shortid()

            cy
                .loginToRewardManager(this.user.be_email, this.user.be_password);
            cy
                .visit(ADD_SCHEME_URL)
                .get(REGISTRATION_CRITERIA_TYPE)
                .select('Preloaded Members')
                .get(CONTINUE_BUTTON)
                .click()

            cy
                .visit(CONFIGURE_TEMPLATE_URL)
                .get(TEMPLATE_NAME_FIELD)
                .type(templateName)
                .get(UPLOAD_ACTION_GRANT)
                .click()
                .get(SELECT_COMMS_TYPE)
                .click()
                .get(TEMPLATE_CONTINUE_BUTTON)
                .click()
                .get(UPLOAD_BUTTON)

            uploadFile(FILE_UPLOAD_INPUT, csvPath);

            cy
                .get(CONTINUE_BUTTON_2)
                .click()
                .get(CONTINUE_BUTTON_3)
                .click()
                .visit(Cypress.env("rmBaseUrl") + '/index.php/admin/MemberHome/Templates/1')
                .get(CONTINUE_BUTTON_4)
                .should('be.visible')
                .contains(templateName)
                .click()

            uploadFile(FILE_UPLOAD_INPUT, csvPath);

            cy
                .get(CONFIRM_UPLOAD_BUTTON)
                .should('be.visible')
                .first()
                .click()
                .get(CONFIRM_OPTION_BUTTON)
                .should('be.visible')
                .click()
                .get(ROUNDED_BLOCK_BUTTON)
                .should('contain', 'Your Membership List has been updated')
                .get(SUCCESS_MESSAGE_CLOSE)
                .click()

            var now = actions.currentDate(0, 'yyyy-MM-dd')
            cy
                .log('now: ' + now)
                .log('hour: ' + new Date().getHours())
                .task('queryDb', 'UPDATE `members_upcoming_anniversary` SET `UpcomingWorkAnniversary` =  ' + "'" + now + "'")
                .task('queryDb', 'UPDATE `members` SET `isShowBirthday` = 1')
                .task('queryDb', 'UPDATE `recurring_notifications_specification` SET `lastRun` = NULL')
                .task('queryDb', 'UPDATE `recurring_notifications_specification` SET `frequencyConfig` = ' + new Date().getHours() + " WHERE `handlerTag` = 'birthday.ecard.reminder'")

            actions.runCronJob(351)

            cy
                .fastLogin()
                .visit(Cypress.env("baseUrl") + "/SocialRecognition")
                .get(ALERTS_DRAWER)
                .click()
                .get(NOTIFICATION_CONTAINER)
                .should("contain", "1st work anniversary today. Send them an eCard to congratulate them.")
                .should("contain", "JoinerB")
                .should("contain", "1st work anniversary today. Send them an eCard to congratulate them.")
                .should("contain", "JoinerA")
                .should("contain", "birthday today. Send them a eCard to wish them Happy Birthday")
                .should("contain", "JoinerB")
                .should("contain", "birthday today. Send them a eCard to wish them Happy Birthday")
                .should("contain", "JoinerA")
        });
    });
});