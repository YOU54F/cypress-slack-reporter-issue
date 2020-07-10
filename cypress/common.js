var format = require('date-format');

export const { uuid } = require('uuidv4');

export function runCronJob(id) {
    cy.request('GET', (Cypress.env('rmBaseUrl') + '/index.php/admin/SystemHome/RunJob/' + id + '.html'))
        .then((response) => {
            cy.log('Running CRON ' + id, response.statusText);
            expect(response.status).to.eq(200)
        });
}

export function getRandomSalesForceID() {
    return 'Q0W1E2R3T4YdU7IVKV'
        .replace('1', randomNumber())
        .replace('2', randomNumber())
        .replace('3', randomNumber())
        .replace('4', randomNumber());
}

export function randomNumber() {
    return Math.floor(Math.random() * 10);
}

export function generateEmail() {
    var strValues = "abcdefg12345";
    var strEmail = "";
    var tmp;
    for (var i = 0; i < 10; i++) {
        tmp = strValues.charAt(Math.round(strValues.length * Math.random()));
        strEmail = strEmail + tmp;
    }
    tmp = "";
    strEmail = "test-" + strEmail + "@rewardgateway.com";
    return strEmail;
}

export function shortid() {
    return require('shortid').generate()
}

export function parseInt(balance) {
    return Number(balance.replace(/[^0-9-]+/g, ""));
}

export function getDate() {
    return new Date().toISOString().slice(0, 10)
}

export function rgsbGenerateEmail() {
    var strValues = "abcdefg12345";
    var strEmail = "";
    var tmp;

    for (var i = 0; i < 10; i++) {
        tmp = strValues.charAt(Math.round(strValues.length * Math.random()));
        strEmail = strEmail + tmp;
    }

    tmp = "";
    strEmail = "hristian.kolev+" + strEmail + "@rewardgateway.com";

    return strEmail;
}

export function rgsbInviteGenerateEmail() {
    var strValues = "abcdefg12345";
    var strEmail = "";
    var tmp;

    for (var i = 0; i < 10; i++) {
        tmp = strValues.charAt(Math.round(strValues.length * Math.random()));
        strEmail = strEmail + tmp;
    }

    tmp = "";
    strEmail = "hristian.kolev+" + strEmail + "@rewardgateway.com";

    return strEmail;
}


export function currentDate(addYears, dateFormat) {
    var date = new Date();
    date.setFullYear(date.getFullYear() + addYears);
    return format.asString(dateFormat, date);
}
