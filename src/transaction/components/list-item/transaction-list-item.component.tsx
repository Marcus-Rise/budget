import type { FC, MouseEventHandler } from "react";
import { useCallback } from "react";
import type { TransactionType } from "../../transaction.model";

type TransactionListItemProps = {
  title: string;
  index: number;
  category: string;
  date: Date;
  amount: number;
  type: TransactionType;
  onClick?: () => void;
  onRemove?: () => void;
};

const TransactionListItem: FC<TransactionListItemProps> = ({
  title,
  amount,
  index,
  category,
  date,
  onClick,
  onRemove,
}) => {
  const remove: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.stopPropagation();

      if (onRemove) {
        onRemove();
      }
    },
    [onRemove],
  );

  return (
    <li onClick={onClick}>
      <span>
        {index + 1}. {title}, {category}, {date.toLocaleDateString()}
      </span>{" "}
      {amount}{" "}
      <button type={"button"} onClick={remove}>
        удалить
      </button>
    </li>
  );
};

export { TransactionListItem };
