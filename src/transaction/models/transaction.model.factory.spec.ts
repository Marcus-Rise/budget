import { TransactionModelFactory } from "./transaction.model.factory";
import { TransactionModel, TransactionType } from "./transaction.model";

describe("TransactionModelFactory", () => {
  describe("fromFormDto", () => {
    it("should create model from form dto", () => {
      const transaction = TransactionModelFactory.fromFormDto({
        title: "",
        type: TransactionType.CREDIT,
        amount: 0,
        date: new Date(),
        category: "",
      });

      expect(transaction).toBeInstanceOf(TransactionModel);
      expect(transaction.uuid.length).toBeGreaterThan(0);
    });
  });
});
