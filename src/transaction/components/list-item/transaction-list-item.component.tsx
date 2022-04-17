import type { FC } from "react";
import type { TransactionType } from "../../transaction.model";

type TransactionListItemProps = {
  title: string;
  index: number;
  category: string;
  date: Date;
  amount: number;
  type: TransactionType;
};

const TransactionListItem: FC<TransactionListItemProps> = ({
  title,
  amount,
  index,
  category,
  date,
}) => {
  return (
    <li>
      <span>
        {index + 1}. {title}, {category}, {date.toLocaleDateString()}
      </span>{" "}
      {amount}
    </li>
  );
};

export { TransactionListItem };
