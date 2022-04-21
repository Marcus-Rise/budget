import type { TransactionType } from "../models";

interface ITransactionRepositoryDto {
  title: string;
  category: string;
  date: string;
  amount: number;
  type: TransactionType;
}

export type { ITransactionRepositoryDto };
