import type { ITransactionFormDto } from "../components/form";
import { TransactionModel, TransactionType } from "./transaction.model";
import type { TransactionRepositoryDto } from "../dto";

class TransactionModelFactory {
  static fromFormDto(dto: ITransactionFormDto): TransactionModel {
    return new TransactionModel(dto.uuid, dto.title, dto.category, dto.amount, dto.type, dto.date);
  }

  static fromRepositoryDto(dto: TransactionRepositoryDto): TransactionModel {
    return new TransactionModel(
      dto.uuid,
      dto.title,
      dto.category,
      dto.amount,
      dto.type === TransactionType.DEBIT ? TransactionType.DEBIT : TransactionType.CREDIT,
      new Date(dto.date),
    );
  }
}

export { TransactionModelFactory };
