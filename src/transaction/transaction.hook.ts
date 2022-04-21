import { useCallback, useEffect, useState } from "react";
import type { TransactionModel } from "./models";
import { TransactionModelFactory } from "./models";
import type { ITransactionFormDto } from "./components/form";
import type { ITransactionRepositoryDto } from "./dto";

const LOCAL_STORAGE_KEY = "BUDGET_DATA";

const useTransaction = () => {
  const [items, setItems] = useState<TransactionModel[]>([]);

  useEffect(() => {
    let data = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (data) {
      setItems(
        JSON.parse(data).map((dto: ITransactionRepositoryDto) =>
          TransactionModelFactory.fromRepositoryDto(dto),
        ),
      );
    }
  }, []);

  const create = useCallback((dto: ITransactionFormDto) => {
    const transaction = TransactionModelFactory.fromFormDto(dto);

    setItems((transactions) => {
      const data = [transaction, ...transactions];

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));

      return data;
    });
  }, []);

  const remove = useCallback((uuid: string) => {
    setItems((transactions) => {
      const transactionIndex = transactions.findIndex((i) => i.uuid === uuid);

      if (transactionIndex === -1) {
        return transactions;
      }

      const data = [
        ...transactions.slice(0, transactionIndex),
        ...transactions.slice(transactionIndex + 1),
      ];

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));

      return data;
    });
  }, []);

  const edit = useCallback((dto: ITransactionFormDto) => {
    setItems((transactions) => {
      const transactionIndex = transactions.findIndex((i) => i.uuid === dto.uuid);

      if (transactionIndex === -1) {
        return transactions;
      }

      const transaction = TransactionModelFactory.fromFormDto(dto);

      const data = [
        ...transactions.slice(0, transactionIndex),
        transaction,
        ...transactions.slice(transactionIndex + 1),
      ];

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));

      return data;
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
