import type { TransactionModel } from "./models";
import { TransactionType } from "./models";

const TRANSACTION_DATA_MOCK: TransactionModel[] = [
  {
    type: TransactionType.DEBIT,
    title: "Зарплата",
    category: "Работа",
    amount: 30000,
    date: new Date(),
    uuid: "1",
  },
  {
    type: TransactionType.CREDIT,
    title: "Еда",
    category: "Дом",
    amount: 5000,
    date: new Date(),
    uuid: "2",
  },
  {
    type: TransactionType.CREDIT,
    title: "Стул",
    category: "Дом",
    amount: 10000,
    date: new Date(),
    uuid: "3",
  },
  {
    type: TransactionType.CREDIT,
    title: "Куртка",
    category: "Себе",
    amount: 10000,
    date: new Date(),
    uuid: "4",
  },
];

export { TRANSACTION_DATA_MOCK };
