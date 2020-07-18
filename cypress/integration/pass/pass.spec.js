describe("pass", () => {
  context("pass a test", () => {
    it("passes a test", function () {
      cy.visit("http://google.com").should("be", "<window>");
    });
  });
});
