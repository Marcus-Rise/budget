enum TransactionType {
  DEBIT = "Доход",
  CREDIT = "Расход",
}

interface ITransactionFormDto {
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: Date;
}

export type { ITransactionFormDto };
export { TransactionType };
