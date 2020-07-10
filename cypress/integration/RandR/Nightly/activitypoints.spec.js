/* eslint-disable cypress/no-unnecessary-waiting */

const wall = require("../../../support/RandR/recognition-wall");
const common = require("../../../common");

const REACT_FORM = '#rm-react-app > div > div > form';
const LOADING_ICON = 'div > svg';
const RULES_PAGE_TITLE = '#rm-react-app > div > h1';
const REACT_APP = '#rm-react-app > div';
const SELECT_ACTIVITY = '.select__control';
const RECOGNITION_WRITTEN = '#react-select-2-option-0';
const SELECT_ACTIVITY_DROPDOWN = ':nth-child(3) > .sc-cHGsZl > .select__control > .select__indicators > .select__indicator'
const SELECT_PROGRAMME_DROPDOWN = ':nth-child(4) > .sc-cHGsZl > .select__control > .select__indicators > .select__indicator'
const FIRST_OPTION = '#react-select-3-option-0';
const SELECT_AWARD_TYPES = ':nth-child(5) > .sc-cHGsZl > .select__control > .select__value-container';
const PUSH_THE_BOUNDARIES_OPTION = '#react-select-4-option-0';

const AWARD_TYPE_CONTAINER = ':nth-child(5) > .sc-cHGsZl > .select__control > .select__value-container';


const HAS_LIMIT                             = '#hasLimit';
const RULE_TABLE                            = ':nth-child(3) > .sc-gGBfsJ';
const RULE_TABLE_2                          = ':nth-child(6) > .sc-gGBfsJ';
const RR_SCHEME_NOMINATION_OPTION           = ':nth-child(4) > .sc-cHGsZl > .select__control > .select__value-container';
const INSTANT_AWARDS_TEST_PROGRAMME_OPTION  = '#react-select-3-option-1';
const AWARD_TYPE_DROPDOWN                   = ':nth-child(5) > .sc-cHGsZl > .select__control > .select__indicators > .select__dropdown-indicator';
const INSTANT_AWARD_1                       = '#react-select-4-option-2';
const SUCCESS_TOAST                         = 'body > div.Toastify > div > div > div.Toastify__toast-body';
const RECOGNITION_WRITTEN_OPTION            = '#react-select-2-option-0';
const COMMENT_WRITTEN_OPTION                = '#react-select-2-option-2';
const AWARDS_TAB_HEADER                     = '[data-testid=award]';
const ACTIVITIES_TAB_LINK                   = '#activities';
const ACTIVITY_ITEMS                        = '#activities-tab';
const ACCEPT_DELETE_COMMENTS                = '.js-accept-deleting';
const DELETE_COMMENT_ICON                   = '.icon-trash';
const MY_BALANCE                            = 'p';
const DELETED_COMMENT_TEXT                  = '.comments-user-text-inner';

describe("Rewards & Recognition", () => {
    before(() => {
        cy.fixture("users/user").as("user");
    });

    beforeEach(() => {
        cy.server()
        cy.task('queryDb', 'DELETE FROM `activity`')
        cy.task('queryDb', 'DELETE FROM `rr_activity_points_rule`')
        cy.task('queryDb', 'DELETE FROM `rr_rule_member_limit`')
        cy.task('queryDb', "UPDATE `transaction` set `LocalStatus` = 'Deleted' WHERE `TransactionType` IN ('110', '111', '112','113','114','115')")
    });

    context("Activity Points", () => {

        it("Should reward recognition actions with activity points", function () {
            cy
                .route({
                    url: '/index.php/**',
                })
                .as('ajaxCall')
            cy
                .loginToRewardManager(this.user.be_email, this.user.be_password);

            const rmUrl = Cypress.env("rmBaseUrl")
            const activityRules = rmUrl + '/index.php/admin/RewardRecognition/ActivityReward/Rule/Listhtml/1.html'
            const AWARD_MESSAGE_TEXT = common.shortid();
            cy
                .visit(activityRules)
                .get(LOADING_ICON)
                .should('not.be.visible')
                .get(RULES_PAGE_TITLE)
                .contains('Activity points rules')
            selectActivity('Recognition Written', RECOGNITION_WRITTEN_OPTION)
                .get(SELECT_PROGRAMME_DROPDOWN)
                .click()
                .get(FIRST_OPTION)
                .should('be.visible')
                .click()
                .wait(1000)
                .get(RR_SCHEME_NOMINATION_OPTION)
                .should('be.visible')
                .click()
                .wait(1000)
                .get(INSTANT_AWARDS_TEST_PROGRAMME_OPTION)
                .should('be.visible')
                .click()
                .wait(1000)
                .get(REACT_FORM)
                .should('contain', 'R&R Scheme Nomination')
                .should('contain', 'Instant  Awards  Test  Programme')
                .get(SELECT_AWARD_TYPES)
                .click()
                .get(PUSH_THE_BOUNDARIES_OPTION)
                .click()
                .get(AWARD_TYPE_CONTAINER)
                .should('contain', 'Push  the  boundaries')
                .get(AWARD_TYPE_DROPDOWN)
                .click()
                .get(INSTANT_AWARD_1)
                .should('be.visible')
                .click()
            pointsReceivedWithLimit(15, 15)
            saveRule()
                .get(SUCCESS_TOAST)
                .should('be.visible')
                .and('contain', 'Rule successfully created')
                .visit(activityRules)
                .get(RULE_TABLE)
                .should('contain', 'Push  the  boundaries')
                .get(RULE_TABLE_2)
                .should('contain', 'enabled')

            cy
                .visit(activityRules)
                .get(LOADING_ICON)
                .should('not.be.visible')
                .get(RULES_PAGE_TITLE)
                .contains('Activity points rules')
            selectActivity('Comment added', COMMENT_WRITTEN_OPTION)
            pointsReceivedWithLimit(2, 3)
            saveRule()
            cy
                .get(SUCCESS_TOAST)
                .should('be.visible')
                .and('contain', 'Rule successfully created')
            cy
                .fastLogin()
            wall
                .goToRecognitionWall()
            wall
                .sendRecognitionTo('helpdesk operator')
            wall
                .sendInstantAward(AWARD_MESSAGE_TEXT)
            wall
                .addCommentToWallPost("Some karma please")
            cy
                .wait(3000)
                .get(DELETE_COMMENT_ICON)
                .click()
                .get(ACCEPT_DELETE_COMMENTS)
                .click()
                .get(DELETED_COMMENT_TEXT)
                .should('contain', 'This comment was deleted by the user')
                .should('be.visible')
            cy
                .visit(Cypress.env("baseUrl") + '/RewardClaim?sPage=myAwards')
                .get(AWARDS_TAB_HEADER)
                .should('be.visible')
                .get(ACTIVITIES_TAB_LINK)
                .click()
                .get(ACTIVITY_ITEMS)
                .should('be.visible')
                .children()
                .should('have.length', 4)
                .should('contain', '-2 GBP')
                .should('contain', '+2 GBP')
                .should('contain', '+15 GBP')
            
                cy
                    .visit(Cypress.env("baseUrl") + '/MyAccount')
                    .get(MY_BALANCE)
                    .should('contain', '£25')
        });
    });

    function selectActivity(ruleName, activityOption) {
        return cy
            .get(REACT_APP)
            .contains('Create new rule')
            .click()
            .get(REACT_FORM)
            .contains('Rule name')
            .click()
            .type(ruleName)
            .get(SELECT_ACTIVITY)
            .click()
            .get(RECOGNITION_WRITTEN)
            .click()
            .get(REACT_FORM)
            .contains('Select programmes')
            .should('be.visible')
            .click()
            .get(SELECT_ACTIVITY_DROPDOWN)
            .should('be.visible')
            .click()
            .wait(1000)
            .get(activityOption)
            .should('be.visible')
            .click()
            .get(activityOption)
            .should('not.be.visible')
    }

    function pointsReceivedWithLimit(points, limit) {
        return cy
            .get(REACT_FORM)
            .contains('Points received')
            .click()
            .type(points)
            .get(HAS_LIMIT)
            .click()
            .get(REACT_FORM)
            .contains('Points per week')
            .click()
            .type(limit);
    }
})

function saveRule() {
    return cy.get(REACT_FORM)
        .contains('Save')
        .should('be.enabled')
        .click();
}