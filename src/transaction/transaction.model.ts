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
}

export { TransactionType, TransactionModel };
