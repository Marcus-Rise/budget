import { addMonths, isSameMonth, isThisMonth, subMonths } from "date-fns";
import type { TransactionModel } from "../../models";

enum TransactionFilterCategoryEnum {
  DATE = "date",
}

type TransactionFilter = {
  name: string;
  category: TransactionFilterCategoryEnum | string;
  filter: (transaction: TransactionModel) => boolean;
};

const isTransactionInSameMonthFilter: TransactionFilter = {
  name: "Текущий месяц",
  category: TransactionFilterCategoryEnum.DATE,
  filter: (transaction) => isThisMonth(transaction.date),
};

const isTransactionInPreviousMonthFilter: TransactionFilter = {
  name: "Предыдущий месяц",
  category: TransactionFilterCategoryEnum.DATE,
  filter: (transaction) => {
    const lastMonthDate = subMonths(new Date(), 1);

    return isSameMonth(transaction.date, lastMonthDate);
  },
};

const isTransactionInNextMonthFilter: TransactionFilter = {
  name: "Следующий месяц",
  category: TransactionFilterCategoryEnum.DATE,
  filter: (transaction) => {
    const nextMonthDate = addMonths(new Date(), 1);

    return isSameMonth(transaction.date, nextMonthDate);
  },
};

const transactionFilters = [
  isTransactionInNextMonthFilter,
  isTransactionInPreviousMonthFilter,
  isTransactionInSameMonthFilter,
];

export {
  isTransactionInSameMonthFilter,
  isTransactionInPreviousMonthFilter,
  isTransactionInNextMonthFilter,
  transactionFilters,
  TransactionFilterCategoryEnum,
};
export type { TransactionFilter };
