import type { FC, MouseEventHandler } from "react";
import { useCallback } from "react";
import { TransactionType } from "../../transaction.model";
import styled, { css } from "styled-components";
import { Price } from "../../../components/price";

const TransactionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 1px 1px 3px 1px #000000a3;
  border-radius: 1rem;
`;

const Item = styled.li`
  padding: 1rem;
  background-color: white;
  display: flex;
  justify-content: space-between;

  &:hover {
    background-color: #eee;
    cursor: pointer;
  }

  &:first-child {
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
  }

  &:not(:last-child) {
    border-bottom: solid #eee;
  }

  &:last-child {
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #868686;
  border-radius: 100%;

  &:hover {
    cursor: pointer;
    background-color: #868686;
    color: #eee;
  }
`;

const StyledPrice = styled(Price)<{ type: TransactionType }>`
  font-weight: bold;

  ${(props) => {
    if (props.type === TransactionType.DEBIT) {
      return css`
        color: green;

        &::before {
          content: "+ ";
        }
      `;
    }
  }}
`;

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
  type,
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
    <Item onClick={onClick}>
      <span>
        {index + 1}. {title}, {category}, {date.toLocaleDateString()}
      </span>
      <div>
        <StyledPrice type={type} amount={amount} />{" "}
        <CloseButton type={"button"} onClick={remove}>
          x
        </CloseButton>
      </div>
    </Item>
  );
};

export { TransactionListItem, TransactionList };
