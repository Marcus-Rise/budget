import { useCallback, useState } from "react";
import type { TransactionModel } from "./transaction.model";
import type { ITransactionFormDto } from "./components/form";
import { TransactionModelFactory } from "./transaction.model.factory";

const useTransaction = () => {
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);

  const createTransaction = useCallback((dto: ITransactionFormDto) => {
    const transaction = TransactionModelFactory.fromFormDto(dto);

    setTransactions((transactions) => [transaction, ...transactions]);
  }, []);

  const deleteTransaction = useCallback((uuid: string) => {
    setTransactions((transactions) => {
      const transactionIndex = transactions.findIndex((i) => i.uuid === uuid);

      if (transactionIndex === -1) {
        return transactions;
      }

      return [
        ...transactions.slice(0, transactionIndex),
        ...transactions.slice(transactionIndex + 1),
      ];
    });
  }, []);

  return {
    transactions,
    createTransaction,
    deleteTransaction,
  };
};

export { useTransaction };
