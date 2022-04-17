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

  return {
    transactions,
    createTransaction,
  };
};

export { useTransaction };
