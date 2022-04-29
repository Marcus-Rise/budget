import type { ITransactionRepositoryDto } from "../dto";

enum TransactionType {
  DEBIT = "Доход",
  CREDIT = "Расход",
}

class TransactionModel {
  constructor(
    public uuid = "",
    public title = "",
    public category = "",
    public amount = 0,
    public type = TransactionType.CREDIT,
    public date = new Date(),
  ) {}

  toJson(): ITransactionRepositoryDto {
    return {
      uuid: this.uuid,
      title: this.title,
      category: this.category,
      amount: this.amount,
      type: TransactionType.CREDIT,
      date: this.date.toJSON(),
    };
  }
}

const TRANSACTION_CATEGORY_OTHER = "Другое";

export { TransactionType, TransactionModel, TRANSACTION_CATEGORY_OTHER };
