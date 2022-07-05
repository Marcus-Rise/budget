import type { TransactionModel } from "../models";
import { TransactionModelFactory } from "../models";
import type {
  ITransactionRepository,
  TransactionRepositoryQuery,
} from "./transaction.repository.interface";
import type { TransactionRepositoryDto } from "../dto";

const baseUrl = "/api/proxy/transaction";

class TransactionApiRepository implements ITransactionRepository {
  list(query: Partial<TransactionRepositoryQuery>): Promise<TransactionModel[]> {
    return fetch(baseUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then<TransactionRepositoryDto[]>((res) => res.json())
      .then((res) => res.map((dto) => TransactionModelFactory.fromRepositoryDto(dto)));
  }

  remove(uuid: string): Promise<void> {
    return fetch(`${baseUrl}/${uuid}`, { method: "DELETE" }).then((res) => res.json());
  }

  save(transaction: TransactionModel): Promise<TransactionModel> {
    if (!!transaction.uuid) {
      return fetch(`${baseUrl}/${transaction.uuid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      })
        .then<TransactionRepositoryDto>((res) => res.json())
        .then((dto) => TransactionModelFactory.fromRepositoryDto(dto));
    }

    return fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    })
      .then<TransactionRepositoryDto>((res) => res.json())
      .then((dto) => TransactionModelFactory.fromRepositoryDto(dto));
  }
}

export { TransactionApiRepository };
