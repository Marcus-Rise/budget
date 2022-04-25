import type { ITransactionFormDto } from "../components/form";
import { TransactionModel } from "./transaction.model";
import { v4 as uuid } from "uuid";
import type { ITransactionRepositoryDto } from "../dto";

class TransactionModelFactory {
  static fromFormDto(dto: ITransactionFormDto): TransactionModel {
    return new TransactionModel(uuid(), dto.title, dto.category, dto.amount, dto.type, dto.date);
  }

  static fromRepositoryDto(dto: ITransactionRepositoryDto): TransactionModel {
    return new TransactionModel(
      uuid(),
      dto.title,
      dto.category,
      dto.amount,
      dto.type,
      new Date(dto.date),
    );
  }
}

export { TransactionModelFactory };