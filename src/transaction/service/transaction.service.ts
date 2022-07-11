import type { ITransactionFormDto } from "../components/form";
import type { TransactionModel } from "../models";
import { TransactionModelFactory } from "../models";
import type { ITransactionRepository } from "../repository/transaction.repository.interface";
import type { TransactionLocalStorageRepository } from "../repository/transaction-local-storage.repository";

class TransactionService {
  constructor(
    private readonly _repo: ITransactionRepository,
    private readonly _localStorageRepo: TransactionLocalStorageRepository,
  ) {}

  load(): Promise<TransactionModel[]> {
    return this._repo.list({});
  }

  async remove(uuid: string): Promise<TransactionModel[]> {
    await this._repo.remove(uuid);

    const items = await this._repo.list({});

    await this._localStorageRepo.persist(items);

    return items;
  }

  async save(dto: ITransactionFormDto): Promise<TransactionModel[]> {
    const transaction = TransactionModelFactory.fromFormDto(dto);

    await this._repo.save(transaction);

    const items = await this._repo.list({});

    await this._localStorageRepo.persist(items);

    return items;
  }

  async upload(): Promise<TransactionModel[]> {
    const items = await this._localStorageRepo.list({});

    const res = await fetch("/api/proxy/transaction/batch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      keepalive: true,
      body: JSON.stringify({ transactions: items }),
    });

    if (!res.ok) {
      throw new Error();
    }

    return this._repo.list({});
  }
}

export { TransactionService };
