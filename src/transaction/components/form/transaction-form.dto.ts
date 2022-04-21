import type { TransactionType } from "../../models";

interface ITransactionFormDto {
  uuid?: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: Date;
}

export type { ITransactionFormDto };
