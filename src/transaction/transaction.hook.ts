import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { TransactionModel } from "./models";
import type { ITransactionFormDto } from "./components/form";
import type { TransactionFilter } from "./components/filter-form";
import { TransactionService } from "./service/transaction.service";
import { TransactionLocalStorageRepository } from "./repository/transaction-local-storage.repository";

const useTransaction = (filters: Array<TransactionFilter> = []) => {
  const [items, setItems] = useState<TransactionModel[]>([]);
  const service = useRef(new TransactionService(new TransactionLocalStorageRepository()));

  useEffect(() => {
    service.current.load().then((data) => setItems(data));
  }, []);

  const remove = useCallback(
    (uuid: string) =>
      service.current
        .remove(uuid)
        .finally(() => service.current.load().then((data) => setItems(data))),
    [],
  );

  const save = useCallback(
    (dto: ITransactionFormDto) =>
      service.current
        .save(dto)
        .finally(() => service.current.load().then((data) => setItems(data))),
    [],
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
