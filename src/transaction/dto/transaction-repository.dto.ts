interface ITransactionRepositoryDto {
  title: string;
  category: string;
  date: string;
  amount: number;
  type: string;
  uuid: string;
}

export type { ITransactionRepositoryDto };
