const EMAIL_HEADER        = 'h1 a'
const CLEAR_EMAILS_BUTTON = ".app .clear";
const EMAIL_MESSAGES      = '#messages table tbody' ;

export function clearEmails() {
    cy
        .visit(Cypress.env("emailBaseUrl"))
        .get(EMAIL_HEADER)
        .should("contain", 'MailCatcher')
        .get(CLEAR_EMAILS_BUTTON)
        .click()
        .get(EMAIL_MESSAGES)
        .should('be.empty')
    ;
}

export function hasBeenSentToWithSubjectLine(recipientEmailAddress, emailSubjectLine) {
    const EMAIL_ITEM = 'tr:has(td:contains("'+recipientEmailAddress+'"))';

    cy
        .visit(Cypress.env("emailBaseUrl"))
        .get(EMAIL_HEADER)
        .should("contain", 'MailCatcher')
        .get(EMAIL_ITEM)
        .should('contain', recipientEmailAddress)
        .and('contain', emailSubjectLine)
    ;
}