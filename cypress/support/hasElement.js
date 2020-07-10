export default function (e, cb) {
    cy.get('body').then(body => {
        if (body.find(e).length > 0) {
            cb();
        }
    });
}