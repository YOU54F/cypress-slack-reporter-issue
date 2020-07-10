import 'cypress-file-upload';

export function uploadFile(locator, fixturePath) {
    cy.get(locator)
        .attachFile(fixturePath);
}

export function uploadFileLegacy(locator, filePath, mimeType) {
    cy.fixture(filePath).then(fileContent => {
        cy.get(locator)
            .upload({
                fileContent,
                fileName: filePath,
                mimeType: mimeType
            });
    });
}