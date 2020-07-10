const actions = require("../../common");
const CA_EMAIL_NEW_USER = actions.rgsbInviteGenerateEmail();
const LoginPage_LOGIN_WITH_EMAIL_BUTTON = '#email_login > .login_btn_text';
const LoginPage_EMAIL_ADDRESS_FIELD = '#login_email';
const LoginPage_PASSWORD_FIELD = '#login_password';
const LoginPage_SUBMIT_BUTTON = '.itcss-button';
const PASSWORD = 'P4sSW0rD12345_';
const ACCOUNT_SLINDOUT = ':nth-child(3) > .trigger-slideout';
const COMMUNICATIONS_LIBRARY_LINK = ':nth-child(3) > ul > :nth-child(3) > a > .label';
const COMMUNICATIONS_LIBRARY_TITLE = '[data-testid=comms-page-title]';
const SUBSCRIPTION_LINK = ':nth-child(3) > ul > :nth-child(4) > a > .label';
const BRANDING_LINK = ':nth-child(3) > ul > :nth-child(2) > a > .label';
const BILLING_TITLE = '[data-testid=subscription-billing-title]';
const SUBSCRIPTION_TITLE = '[data-testid=subscription-subscription-title]';
const SUPPORT_TITLE = '[data-testid=subscription-support-title]';
const MANAGE_BILLING_BUTTON = '[data-testid=manage-billing]';
const REQUEST_TO_CANCEL_BUTTON = '[data-testid=request-cancel]';
const REQUEST_FOR_SUPPORT_BUTTON = '[data-testid=request-support]';
const MANAGE_USERS_LINK = ':nth-child(3) > ul > :nth-child(1) > a > .label';
const INVITE_YOUR_TEAM_TITLE = '#content_container';
const USER_COLUMN = '#content_container';
const ROLE_COLUMN = '#content_container';
const STATUS_COLUMN = '#content_container';
const ADMIN_NAMES = '[style="margin-top: 4px;"] > strong';
const REMOVE_USER_BUTTON = '[data-testid=remove-user]';
const INVITE_USERS_INPUT_FIELD = '.react-multi-email > input';
const SEND_INVITES_BUTTON = '[data-testid=send-invites]';
const STATUS_DROPDOWN = '.select__control';
const INVITED_REMOVE_BUTTON = ':nth-child(3) > .sc-jwKygS > .sc-jbKcbu > .sc-dNLxif > :nth-child(2) > [data-testid=remove-user]';
const INVITED_USER_LIST = '#content_container';
const REMOVED_USER_LIST = '#content_container';
const USER_GUIDE_NEXT_STEP = '#user-guide-next-step';
const USER_GUIDE_PREV_STEP = '#user-guide-prev-step';
const USER_GUIDE_DONE = '#user-guide-done';
const USER_GUIDE_CLOSE = '#user-guide-close';
const USER_GUIDE_SKIP = '#user-guide-skip';
const MANAGE_USERS_NAV_LINK = '[data-rg-guides-id=rgsb-menu-guide-manage-users]';
const BRANDING_NAV_LINK = '[data-rg-guides-id=rgsb-menu-guide-branding]';
const COMMS_LIBRARY_NAV_LINK = '[data-rg-guides-id=rgsb-menu-guide-comms-library]';
const SUBSCRIPTION_NAV_LINK = '[data-rg-guides-id=rgsb-menu-guide-subscription]';
describe("Member management", () => {
    before(() => {
        cy.clearCookies()
        cy.clearLocalStorage()
    });
    context('Member management', () => {
        it("Members", function () {
            
            cy
            .readFile('data.json')
            .then((file) => {
                cy
                    .visit('https://c' + file.DOMAIN_ID + '.testing.aws.rewardgateway.net')
                    .get(LoginPage_LOGIN_WITH_EMAIL_BUTTON).click()
                    .get(LoginPage_EMAIL_ADDRESS_FIELD).type(file.CA_EMAIL)
                    .get(LoginPage_PASSWORD_FIELD).type(PASSWORD)
                    .get(LoginPage_SUBMIT_BUTTON).click()
                    .title().should('eq', 'Reward Hub | Welcome to your Reward Hub')
                    .url().should('eq', 'https://c' + file.DOMAIN_ID + '.testing.aws.rewardgateway.net/SmartHub') 

                    //Communications Library
                    .get(ACCOUNT_SLINDOUT).click()
                    .get(COMMUNICATIONS_LIBRARY_LINK).click()
                    .url().should('eq', 'https://c' + file.DOMAIN_ID + '.testing.aws.rewardgateway.net/admin/comms')
                    .get(USER_GUIDE_NEXT_STEP).click()
                    .get(USER_GUIDE_PREV_STEP).click()
                    .get(USER_GUIDE_CLOSE).click()
                    .get(COMMUNICATIONS_LIBRARY_TITLE).contains('Launch communications')

                    //Subscription
                    .get(ACCOUNT_SLINDOUT).click()
                    .get(SUBSCRIPTION_LINK).click()
                    .url().should('eq', 'https://c' + file.DOMAIN_ID + '.testing.aws.rewardgateway.net/admin/subscription')
                    .get(USER_GUIDE_NEXT_STEP).click()
                    .get(USER_GUIDE_NEXT_STEP).click()
                    .get(USER_GUIDE_PREV_STEP).click()
                    .get(USER_GUIDE_CLOSE).click()
                    .get(BILLING_TITLE).contains('Billing')
                    .get(MANAGE_BILLING_BUTTON).should('exist')
                    .get(SUBSCRIPTION_TITLE).contains('Subscription')
                    .get(REQUEST_TO_CANCEL_BUTTON).should('exist')
                    .get(SUPPORT_TITLE).contains('Support')
                    .get(REQUEST_FOR_SUPPORT_BUTTON).should('exist')

                    //Branding
                    .get(ACCOUNT_SLINDOUT).click()
                    .get(BRANDING_LINK).click()
                    .url().should('eq', 'https://c' + file.DOMAIN_ID + '.testing.aws.rewardgateway.net/admin/branding')
                    .get(USER_GUIDE_SKIP).click()

                    //Manage user
                    .get(ACCOUNT_SLINDOUT).click()
                    .get(MANAGE_USERS_LINK).click()
                    .url().should('eq', 'https://c' + file.DOMAIN_ID + '.testing.aws.rewardgateway.net/admin/v2/members')
                    .get(USER_GUIDE_NEXT_STEP).click()
                    .get(USER_GUIDE_NEXT_STEP).click()
                    .get(USER_GUIDE_NEXT_STEP).click()
                    .get(USER_GUIDE_DONE).click()
                    .get(INVITE_YOUR_TEAM_TITLE).contains('Invite your team')
                    .get(REMOVE_USER_BUTTON).should('not.exist')
                    .get(USER_COLUMN).contains('User')
                    .get(ROLE_COLUMN).contains('Role')
                    .get(STATUS_COLUMN).contains('Status')
                    .get(ADMIN_NAMES).contains('Firstname Lastname')
                    .get(ROLE_COLUMN).contains('Role')
                    .get(STATUS_COLUMN).contains('Status')
                    .get(REMOVE_USER_BUTTON).should('not.exist')
                    .get(STATUS_DROPDOWN).type('invited{enter}')
                    .get(INVITED_USER_LIST).contains('You have not invited anyone just yet, please add your team members above')
                    .get(INVITE_USERS_INPUT_FIELD).type(CA_EMAIL_NEW_USER + ' ')
                    .get(SEND_INVITES_BUTTON).click()
                    .wait(4000)
                    .get(MANAGE_USERS_NAV_LINK).click()
                    .get(STATUS_DROPDOWN).type('all{enter}')
                    .get(INVITED_USER_LIST).contains(CA_EMAIL_NEW_USER)
                    .get(INVITED_USER_LIST).contains('Invited')
                    .get(STATUS_DROPDOWN).type('invited{enter}')
                    .get(INVITED_USER_LIST).contains(CA_EMAIL_NEW_USER)
                    .get(INVITED_USER_LIST).contains('Invited')
                    .get(INVITED_REMOVE_BUTTON).should('not.exist')                  
                    .get(STATUS_DROPDOWN).type('removed{enter}')
                    .get(REMOVED_USER_LIST).contains('You have not removed anyone yet. If someone has left the company, you can remove them by viewing their record details and clicking ')
                    .get(REMOVED_USER_LIST).should(($list) => {
                        expect($list).to.not.contain(CA_EMAIL_NEW_USER)
                      })

                    .get(MANAGE_USERS_NAV_LINK).click()
                    .url().should('eq', 'https://c' + file.DOMAIN_ID + '.testing.aws.rewardgateway.net/admin/v2/members')

                    .get(BRANDING_NAV_LINK).click()
                    .url().should('eq', 'https://c' + file.DOMAIN_ID + '.testing.aws.rewardgateway.net/admin/branding')

                    .get(COMMS_LIBRARY_NAV_LINK).click()
                    .url().should('eq', 'https://c' + file.DOMAIN_ID + '.testing.aws.rewardgateway.net/admin/comms')

                    .get(SUBSCRIPTION_NAV_LINK).click()
                    .url().should('eq', 'https://c' + file.DOMAIN_ID + '.testing.aws.rewardgateway.net/admin/subscription')

            })       
        })
    })
})