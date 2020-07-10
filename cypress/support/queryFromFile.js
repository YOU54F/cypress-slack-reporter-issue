export function queryFromFile(sqlFile) {
    cy
        .readFile(sqlFile)
        .then((sql) => {
            sql.toString().split('\n')
                .forEach(function (line) {
                    cy.task('queryDb', line)
                        .then(results => {
                            cy.log('affected rows: ' + results.affectedRows);
                        });
                });
        });
}