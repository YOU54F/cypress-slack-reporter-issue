describe("fail", () => {
  context("fail a test", () => {
    it("fails a test", function () {
      cy.visit("http://google.com").should("be.true", "<window>");
    });
  });
});
