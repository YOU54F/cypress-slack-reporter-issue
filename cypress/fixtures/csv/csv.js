var format = require('date-format');

function currentDate(addYears, dateFormat) {
    var date = new Date();
    date.setFullYear(date.getFullYear() + addYears);
    return format.asString(dateFormat, date);
}
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: './cypress/fixtures/csv/gen_anniversary.csv',
    header: [{
            id: 'First_name',
            title: 'First name'
        },
        {
            id: 'Last_name',
            title: 'Last name'
        },
        {
            id: 'Email_address',
            title: 'Email address'
        },
        {
            id: 'Payroll_number',
            title: 'Payroll numner'
        },
        {
            id: 'Registration_date',
            title: 'Registration date'
        },
        {
            id: 'Start_date',
            title: 'Start date'
        },
        {
            id: 'Line_manager',
            title: 'Line manager'
        },
        {
            id: 'Date_of_Birth',
            title: 'Date of Birth'
        },
        {
            id: 'Manual_ID',
            title: 'Manual ID'
        },
    ]
});

var twentyYearsAgoFormatted = currentDate(-20, 'dd/MM/yyyy');
var oneYearAgoFormatted = currentDate(-1, 'dd/MM/yyyy');

const data = [{
    First_name: 'NewA',
    Last_name: 'JoinerA',
    Email_address: 'robin.miklinski1@reward-gateway.com',
    Payroll_number: 'NEWA',
    Registration_date: oneYearAgoFormatted,
    Start_date: oneYearAgoFormatted,
    Line_manager: '001',
    Date_of_Birth: twentyYearsAgoFormatted,
    Manual_ID: '123'
}, {
    First_name: 'NewB',
    Last_name: 'JoinerB',
    Email_address: 'robin.miklinski2@reward-gateway.com',
    Payroll_number: 'NEWB',
    Registration_date: oneYearAgoFormatted,
    Start_date: oneYearAgoFormatted,
    Line_manager: '001',
    Date_of_Birth: twentyYearsAgoFormatted,
    Manual_ID: '345'
}];
csvWriter
    .writeRecords(data)
    .then(() => console.log('CSV file was generated successfully'));