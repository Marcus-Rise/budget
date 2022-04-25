import { useCallback, useEffect, useMemo, useState } from "react";
import type { TransactionModel } from "./models";
import { TransactionModelFactory, TransactionType } from "./models";
import type { ITransactionFormDto } from "./components/form";
import type { ITransactionRepositoryDto } from "./dto";

const LOCAL_STORAGE_KEY = "BUDGET_DATA";
const TRANSACTION_CATEGORY_OTHER = "Другое";

const useTransaction = () => {
  const [items, setItems] = useState<TransactionModel[]>([]);

  const categories = useMemo(() => {
    const transactionCategories = items.map((transaction) => transaction.category);

    const uniqueCategories = new Set(transactionCategories);

    uniqueCategories.add(TRANSACTION_CATEGORY_OTHER);

    return Array.from(uniqueCategories);
  }, [items]);

  const profit = useMemo(
    () =>
      items.reduce<number>((amount, transaction) => {
        return transaction.type === TransactionType.DEBIT
          ? amount + transaction.amount
          : amount - transaction.amount;
      }, 0),
    [items],
  );

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
    profit,
    transactionCategories: categories,
  };
};

export { useTransaction, TRANSACTION_CATEGORY_OTHER };
