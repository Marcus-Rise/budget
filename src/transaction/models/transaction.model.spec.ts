import { TransactionModel } from "./transaction.model";

describe("TransactionModel", () => {
  describe("toJson", () => {
    it("should not be empty", () => {
      expect(new TransactionModel().toJson()).not.toEqual("{}");
    });

    it("should not be empty array", () => {
      expect(JSON.stringify([new TransactionModel()])).not.toEqual("[{}]");
    });
  });
});
