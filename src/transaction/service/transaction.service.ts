import type { ITransactionFormDto } from "../components/form";
import type { TransactionModel } from "../models";
import { TransactionModelFactory } from "../models";
import type { ITransactionRepository } from "../repository/transaction.repository.interface";

class TransactionService {
  constructor(private readonly _repo: ITransactionRepository) {}

  load(): Promise<TransactionModel[]> {
    return this._repo.list({});
  }

  remove(uuid: string): Promise<void> {
    return this._repo.remove(uuid);
  }

  save(dto: ITransactionFormDto): Promise<TransactionModel> {
    const transaction = TransactionModelFactory.fromFormDto(dto);

    return this._repo.save(transaction);
  }
}

export { TransactionService };
