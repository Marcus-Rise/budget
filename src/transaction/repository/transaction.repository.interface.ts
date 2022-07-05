import type { TransactionModel, TransactionType } from "../models";

type TransactionRepositoryQuery = {
  uuid: string;
  title: string;
  category: string;
  minAmount: number;
  maxAmount: number;
  type: TransactionType;
  minDate: Date;
  maxDate: Date;
};

interface ITransactionRepository {
  save(transaction: TransactionModel): Promise<TransactionModel>;

  remove(uuid: string): Promise<void>;

  find(uuid: string): Promise<TransactionModel | null>;

  list(query: Partial<TransactionRepositoryQuery>): Promise<TransactionModel[]>;
}

export type { ITransactionRepository, TransactionRepositoryQuery };
