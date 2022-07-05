import type { TransactionModel } from "../models";
import { TransactionModelFactory } from "../models";
import type {
  ITransactionRepository,
  TransactionRepositoryQuery,
} from "./transaction.repository.interface";
import type { ITransactionRepositoryDto } from "../dto";

const TRANSACTION_LOCAL_STORAGE_KEY = "BUDGET_DATA";

class TransactionLocalStorageRepository implements ITransactionRepository {
  async find(uuid: string): Promise<TransactionModel | null> {
    const items = await this.getItems();

    return items.find((i) => i.uuid === uuid) ?? null;
  }

  list(query: Partial<TransactionRepositoryQuery>): Promise<TransactionModel[]> {
    return this.getItems();
  }

  async remove(uuid: string): Promise<void> {
    const transactions = await this.getItems();
    const transactionIndex = transactions.findIndex((i) => i.uuid === uuid);

    if (transactionIndex !== -1) {
      const data = [
        ...transactions.slice(0, transactionIndex),
        ...transactions.slice(transactionIndex + 1),
      ];

      localStorage.setItem(TRANSACTION_LOCAL_STORAGE_KEY, JSON.stringify(data));
    }
  }

  async save(transaction: TransactionModel): Promise<TransactionModel> {
    const transactions = await this.getItems();
    const transactionIndex = transactions.findIndex((i) => i.uuid === transaction.uuid);

    let data: TransactionModel[];

    if (transactionIndex === -1) {
      data = [transaction, ...transactions];
    } else {
      data = [
        ...transactions.slice(0, transactionIndex),
        transaction,
        ...transactions.slice(transactionIndex + 1),
      ];
    }

    localStorage.setItem(TRANSACTION_LOCAL_STORAGE_KEY, JSON.stringify(data));

    return transaction;
  }

  async getItems(): Promise<TransactionModel[]> {
    const data = localStorage.getItem(TRANSACTION_LOCAL_STORAGE_KEY);

    if (data) {
      return JSON.parse(data).map((dto: ITransactionRepositoryDto) =>
        TransactionModelFactory.fromRepositoryDto(dto),
      );
    }

    return [];
  }
}

export { TransactionLocalStorageRepository };
