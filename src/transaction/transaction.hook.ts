import { useCallback, useEffect, useMemo, useState } from "react";
import type { TransactionModel } from "./models";
import type { ITransactionFormDto } from "./components/form";
import type { TransactionFilter } from "./components/filter-form";
import { TransactionService } from "./service/transaction.service";
import { apiRepository, localStorageRepository } from "./repository";

const useTransaction = (isAuthed: boolean, filters: Array<TransactionFilter> = []) => {
  const [items, setItems] = useState<TransactionModel[]>([]);
  const service = useMemo(
    () => new TransactionService(isAuthed ? apiRepository : localStorageRepository),
    [isAuthed],
  );

  useEffect(() => {
    service
      .load()
      .then((data) => setItems(data))
      .catch(console.error);
  }, [service]);

  const remove = useCallback(
    (uuid: string) =>
      service.remove(uuid).finally(() => service.load().then((data) => setItems(data))),
    [service],
  );

  const save = useCallback(
    (dto: ITransactionFormDto) =>
      service.save(dto).finally(() => service.load().then((data) => setItems(data))),
    [service],
  );

  const filteredItems = useMemo(
    () => items.filter((transaction) => filters.every(({ filter }) => filter(transaction))),
    [filters, items],
  );

  return {
    transactions: filteredItems,
    deleteTransaction: remove,
    saveTransaction: save,
  };
};

export { useTransaction };
export type { TransactionFilter };
