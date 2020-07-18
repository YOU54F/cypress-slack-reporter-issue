import "./doesntexist";

describe("error", () => {
  context("error the test", () => {
    it("errors a test", function () {
      throw new Error("Erroring the test run");
    });
  });
});
