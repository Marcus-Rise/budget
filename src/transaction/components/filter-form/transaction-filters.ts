import { addMonths, isSameMonth, isThisMonth, subMonths } from "date-fns";
import type { TransactionModel } from "../../models";

enum TransactionFilterNameEnum {
  PREVIOUS_MONTH = "Предыдущий месяц",
  CURRENT_MONTH = "Текущий месяц",
  NEXT_MONTH = "Следующий месяц",
}

enum TransactionFilterCategoryEnum {
  DATE = "date",
}

type TransactionFilter = {
  name: TransactionFilterNameEnum | string;
  category: TransactionFilterCategoryEnum | string;
  filter: (transaction: TransactionModel) => boolean;
};

const isTransactionInSameMonthFilter: TransactionFilter = {
  name: TransactionFilterNameEnum.CURRENT_MONTH,
  category: TransactionFilterCategoryEnum.DATE,
  filter: (transaction) => isThisMonth(transaction.date),
};

const isTransactionInPreviousMonthFilter: TransactionFilter = {
  name: TransactionFilterNameEnum.PREVIOUS_MONTH,
  category: TransactionFilterCategoryEnum.DATE,
  filter: (transaction) => {
    const lastMonthDate = subMonths(new Date(), 1);

    return isSameMonth(transaction.date, lastMonthDate);
  },
};

const isTransactionInNextMonthFilter: TransactionFilter = {
  name: TransactionFilterNameEnum.NEXT_MONTH,
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
  TransactionFilterNameEnum,
  isTransactionInSameMonthFilter,
  isTransactionInPreviousMonthFilter,
  isTransactionInNextMonthFilter,
  transactionFilters,
  TransactionFilterCategoryEnum,
};
export type { TransactionFilter };
