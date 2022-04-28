import type { TransactionType } from "../../models";

interface ITransactionWelcomeFormDto {
  uuid?: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: Date;
}

export type { ITransactionWelcomeFormDto };
