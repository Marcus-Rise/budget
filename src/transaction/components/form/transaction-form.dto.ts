import type { TransactionType } from "../../transaction.model";

interface ITransactionFormDto {
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: Date;
}

export type { ITransactionFormDto };
