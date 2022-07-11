import { useCallback, useEffect, useMemo, useState } from "react";
import type { TransactionModel } from "./models";
import type { ITransactionFormDto } from "./components/form";
import type { TransactionFilter } from "./components/filter-form";
import { TransactionService } from "./service/transaction.service";
import { apiRepository, localStorageRepository } from "./repository";

const useTransaction = (isAuthed: boolean | null, filters: Array<TransactionFilter> = []) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [items, setItems] = useState<TransactionModel[]>([]);
  const service = useMemo(
    () =>
      new TransactionService(
        isAuthed ? apiRepository : localStorageRepository,
        localStorageRepository,
      ),
    [isAuthed],
  );

  useEffect(() => {
    if (isAuthed !== null && !isInitialized) {
      service
        .load()
        .then((data) => {
          setItems(data);
          setIsInitialized(true);
        })
        .catch(console.error);
    }
  }, [isAuthed, isInitialized, service]);

  const remove = useCallback(
    (uuid: string) =>
      service
        .remove(uuid)
        .then((data) => setItems(data))
        .catch(console.error),
    [service],
  );

  const save = useCallback(
    (dto: ITransactionFormDto) =>
      service
        .save(dto)
        .then((data) => setItems(data))
        .catch(console.error),
    [service],
  );

  const filteredItems = useMemo(
    () => items.filter((transaction) => filters.every(({ filter }) => filter(transaction))),
    [filters, items],
  );

  const uploadData = useCallback(
    () =>
      service
        .upload()
        .then((data) => setItems(data))
        .catch(console.error),
    [service],
  );

  return {
    transactions: filteredItems,
    deleteTransaction: remove,
    saveTransaction: save,
    uploadTransactions: uploadData,
  };
};

export { useTransaction };
export type { TransactionFilter };
