import { useCallback, useState } from "react";
import type { TransactionModel } from "./models";
import type { ITransactionFormDto } from "./components/form";
import { TransactionModelFactory } from "./models";

const useTransaction = () => {
  const [items, setItems] = useState<TransactionModel[]>([]);

  const create = useCallback((dto: ITransactionFormDto) => {
    const transaction = TransactionModelFactory.fromFormDto(dto);

    setItems((transactions) => [transaction, ...transactions]);
  }, []);

  const remove = useCallback((uuid: string) => {
    setItems((transactions) => {
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

  const edit = useCallback((dto: ITransactionFormDto) => {
    setItems((transactions) => {
      const transactionIndex = transactions.findIndex((i) => i.uuid === dto.uuid);

      if (transactionIndex === -1) {
        return transactions;
      }

      const transaction = TransactionModelFactory.fromFormDto(dto);

      return [
        ...transactions.slice(0, transactionIndex),
        transaction,
        ...transactions.slice(transactionIndex + 1),
      ];
    });
  }, []);

  const save = useCallback(
    (dto: ITransactionFormDto) => {
      if (dto.uuid) {
        edit(dto);
      } else {
        create(dto);
      }
    },
    [create, edit],
  );

  return {
    transactions: items,
    createTransaction: create,
    deleteTransaction: remove,
    editTransaction: edit,
    saveTransaction: save,
  };
};

export { useTransaction };
