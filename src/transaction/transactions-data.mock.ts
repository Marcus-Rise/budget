import { TransactionModel, TransactionType } from "./models";

const TRANSACTION_DATA_MOCK: TransactionModel[] = [
  new TransactionModel("1", "Зарплата", "Работа", 30000, TransactionType.DEBIT, new Date()),
  new TransactionModel("2", "Еда", "Дом", 5000, TransactionType.CREDIT, new Date()),
  new TransactionModel("3", "Стул", "Дом", 10000, TransactionType.CREDIT, new Date()),
  new TransactionModel("4", "Куртка", "Себе", 10000, TransactionType.CREDIT, new Date()),
  new TransactionModel(
    "5",
    "Старая покупка",
    "Себе",
    1000,
    TransactionType.CREDIT,
    new Date(2022, 1, 12),
  ),
];

export { TRANSACTION_DATA_MOCK };
