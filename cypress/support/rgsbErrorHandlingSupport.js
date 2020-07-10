//LoginPage
const LoginPage_LOGIN_WITH_EMAIL_BUTTON = '#email_login > .login_btn_text';
const LoginPage_EMAIL_ADDRESS_FIELD = '#login_email';
const LoginPage_PASSWORD_FIELD = '#login_password';
const LoginPage_SUBMIT_BUTTON = '.itcss-button';
const PASSWORD = 'P4sSW0rD12345_';
export function loginWrongDetails() {
    const USERNAME_VALIDATION = '#username_validation';
    const EMAIL_ADDRESS_FIELD = '.itcss-form-field > #email';
    const INCORRECT_PASSWORD_ERR_MESSAGE = '#password_validation';
    const BACK_TO_PREV_PAGE_BUTTON = '.reset_account_back > a';
    const SUBTITLE = 'p';
    const PAGE_TITLE = '.title';
    const STOP_ERR_MESSAGE = '#login-error-summary > li';
    cy
        .readFile('data.json')
        .then((file) => {
            cy
                .visit('https://c' + file.DOMAIN_ID + '.testing.aws.rewardgateway.net')
                .get(LoginPage_LOGIN_WITH_EMAIL_BUTTON).click()
                .get(LoginPage_EMAIL_ADDRESS_FIELD)
                .clear()
                .type('_' + file.CA_EMAIL)
                .get(LoginPage_PASSWORD_FIELD)
                .type(PASSWORD)
                .get(LoginPage_SUBMIT_BUTTON)
                .click()
                .get(USERNAME_VALIDATION)
                .should('have.text', 'Sorry but your email address has not been recognised.\n\n If you think you have registered with a different email address then please try to login again with that address.')
                .get(LoginPage_EMAIL_ADDRESS_FIELD)
                .clear()
                .type(file.CA_EMAIL)
                .get(LoginPage_PASSWORD_FIELD)
                .type(PASSWORD + '_')
                .get(LoginPage_SUBMIT_BUTTON)
                .click()
                .get(INCORRECT_PASSWORD_ERR_MESSAGE)
                .should('contain', 'Sorry but the password you have entered is incorrect. Please note that passwords are case sensitive - check that CAPS LOCK is not on before trying again. If you have forgotten your details you can ')
                .get('li > [href="https://c' + file.DOMAIN_ID + '.testing.aws.rewardgateway.net/Authentication/Recover/Password"]')
                .click()
                .url().should('eq', 'https://c' + file.DOMAIN_ID + '.testing.aws.rewardgateway.net/Authentication/Recover/Password')
                .title().should('eq', 'Reward Hub | Account Recovery')
                .get(PAGE_TITLE).should('have.text', "Let's find your account")
                .get(SUBTITLE).should('have.text', "Please enter the email you used to register.")
                .get(EMAIL_ADDRESS_FIELD)
                .invoke('val')
                .should('contain', file.CA_EMAIL)
                .get(BACK_TO_PREV_PAGE_BUTTON)
                .click()
                .get(LoginPage_EMAIL_ADDRESS_FIELD)
                .clear()
                .type(file.CA_EMAIL)
                .get(LoginPage_PASSWORD_FIELD)
                .type(PASSWORD + '_')
                .get(LoginPage_SUBMIT_BUTTON)
                .click()
                .get(INCORRECT_PASSWORD_ERR_MESSAGE)
                .should('contain', 'Sorry but the password you have entered is incorrect. Please note that passwords are case sensitive - check that CAPS LOCK is not on before trying again. If you have forgotten your details you can ')
                .get(LoginPage_EMAIL_ADDRESS_FIELD)
                .clear()
                .type(file.CA_EMAIL)
                .get(LoginPage_PASSWORD_FIELD)
                .type(PASSWORD + '=')
                .get(LoginPage_SUBMIT_BUTTON)
                .click()
                .get(STOP_ERR_MESSAGE).should('contain', 'STOP. You have entered an incorrect password 3 times! If you have forgotten your details you can ')
                .get('li > [href="https://c' + file.DOMAIN_ID + '.testing.aws.rewardgateway.net/Authentication/Recover/Password"]')
                .click()
                .url().should('eq', 'https://c' + file.DOMAIN_ID + '.testing.aws.rewardgateway.net/Authentication/Recover/Password')
                .title().should('eq', 'Reward Hub | Account Recovery')
                .get(PAGE_TITLE).should('have.text', "Let's find your account")
                .get(SUBTITLE).should('have.text', "Please enter the email you used to register.")
                .get(EMAIL_ADDRESS_FIELD)
                .invoke('val')
                .should('contain', file.CA_EMAIL)
                .get(BACK_TO_PREV_PAGE_BUTTON)
                .click()
                
        })
}

const PASSWORD_FIELD = '[name=password]';
const CONFIRM_PASSWORD_FIELD = '[name=passwordConfirmation]';
const PHONE_NUMBER_FIELD = '[name=phone]';
const NEXT_BUTTON = '.ShinyButton__ButtonEffect-t435pu-2';
const CA_FIRST_NAME = 'Firstname';
const CA_LAST_NAME = 'Lastname';
const CA_POSTAL_CODE = 'M1 1AE';
const ADDRESS_LINE_2 = 'Sugar Hill baby';
const CITY_FIELD = ':nth-child(9) > .InputFloatingLabel__StyledInput-j02spn-1';
const SITE_DETAILS_TITLE = '.Title-sc-12jvmul-0';
const COMPANY_NAME_TITLE = '.Title-sc-12jvmul-0';
const CA_STREET_ADDRESS = 'Cypress Hill 18';
const POST_CODE_FIELD = ':nth-child(10) > .InputFloatingLabel__StyledInput-j02spn-1';
const ADDRESS_LINE_1_FIELD = ':nth-child(7) > .InputFloatingLabel__StyledInput-j02spn-1';
const ADDRESS_LINE_2_FIELD = ':nth-child(8) > .InputFloatingLabel__StyledInput-j02spn-1';
const FIRSTNAME_FIELD = '[name=firstName]';
const LASTNAME_FIELD = '[name=lastName]';
const FIRSTNAME_ERR_MESSAGE = '.NarrowBox-n2ofv5-0 > :nth-child(5)';
const LASTNAME_ERR_MESSAGE = '.NarrowBox-n2ofv5-0 > :nth-child(7)';
const PASSWORD_MUST_MATCH_MESSAGE = '.StyledErrorMessage-sc-1occ3x1-0';
const PASSWORD_ERR_MESSAGE = '.NarrowBox-n2ofv5-0 > :nth-child(9)';
const CONFIRM_PASSWORD_ERR_MESSAGE = '.NarrowBox-n2ofv5-0 > :nth-child(11)';
const POSTCODE_ERR_MESSAGE = '.StyledErrorMessage-sc-1occ3x1-0';
const TOP_ERR_MESSAGE = '.Notification__ContentSection-mb67nr-3 > p';
const ALIAS_NAME_ERR = '.StyledErrorMessage-sc-1occ3x1-0';

export function verificationFlowFieldValidations() {
    
    cy
    .readFile('data.json')
    .then((file) => {
        const verificationUrl = Cypress.env('rarebreedTestUrl') + '/?member_id=' + file.memberUuid + '&code=' + file.verificationCode
        cy.visit(verificationUrl)
        })
        cy
            .scrollTo('bottom')
            .title().should('eq', 'Reward Gateway for Small Business')
            .get(NEXT_BUTTON)
            .click()
            .get(PASSWORD_ERR_MESSAGE)
            .should('have.text', 'Password is required')
            .get(CONFIRM_PASSWORD_ERR_MESSAGE)
            .should('have.text', 'Please confirm your password')
            .get(PASSWORD_FIELD)
            .type(PASSWORD)
            .get(CONFIRM_PASSWORD_FIELD)
            .type(PASSWORD + '_')
            .get(PHONE_NUMBER_FIELD)
            .get(NEXT_BUTTON)
            .click()
            .get(TOP_ERR_MESSAGE)
            .should('have.text', 'There is/are one or more errors, please check the information provided.')
            .get(PASSWORD_MUST_MATCH_MESSAGE)
            .should('have.text', 'Passwords must match')
            .get(CONFIRM_PASSWORD_FIELD)
            .clear()
            .type(PASSWORD)
            .get(FIRSTNAME_FIELD)
            .clear()
            .get(LASTNAME_FIELD)
            .clear()
            .get(NEXT_BUTTON)
            .click()
            .get(TOP_ERR_MESSAGE)
            .should('have.text', 'There is/are one or more errors, please check the information provided.')
            .get(FIRSTNAME_ERR_MESSAGE)
            .should('have.text', 'First name is required')
            .get(LASTNAME_ERR_MESSAGE)
            .should('have.text', 'Last name is required')
            .get(FIRSTNAME_FIELD)
            .type(CA_FIRST_NAME)
            .get(LASTNAME_FIELD)
            .type(CA_LAST_NAME)
            .get(NEXT_BUTTON)
            .click()
            .get(COMPANY_NAME_TITLE)
            .should('contain', 'Company Details')                        
            .get(ADDRESS_LINE_1_FIELD)
            .clear()
            .get(ADDRESS_LINE_2_FIELD)
            .type(ADDRESS_LINE_2)
            .get(CITY_FIELD)
            .get(POST_CODE_FIELD)
            .get(NEXT_BUTTON)
            .click()
            .get(TOP_ERR_MESSAGE)
            .should('have.text', 'There is/are one or more errors, please check the information provided.')
            .get(ADDRESS_LINE_1_FIELD)
            .type(CA_STREET_ADDRESS)
            .get(POST_CODE_FIELD)
            .clear()
            .get(NEXT_BUTTON)
            .click()
            .get(TOP_ERR_MESSAGE)
            .should('have.text', 'There is/are one or more errors, please check the information provided.')
            .get(POSTCODE_ERR_MESSAGE)
            .should('have.text', 'Postcode is required')
            .get(POST_CODE_FIELD)
            .type(CA_POSTAL_CODE)
            .get(NEXT_BUTTON)
            .click()
            .get(SITE_DETAILS_TITLE)
            .should('contain', 'Site details')
            .get(NEXT_BUTTON)
            .click()
            .get(TOP_ERR_MESSAGE)
            .should('have.text', 'There is/are one or more errors, please check the information provided.')
            .get(ALIAS_NAME_ERR)
            .should('have.text', 'Please select a scheme alias name')

}


