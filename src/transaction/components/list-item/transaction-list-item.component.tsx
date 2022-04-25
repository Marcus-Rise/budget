import type { FC, MouseEventHandler } from "react";
import { useCallback } from "react";
import { TransactionType } from "../../models";
import styled, { css } from "styled-components";
import { Price } from "../../../components/price";

const Item = styled.li`
  padding: 1rem 0;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #eee;
    cursor: pointer;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #868686;
  border-radius: 100%;
  margin-left: 0.75rem;

  &:hover {
    cursor: pointer;
    background-color: #868686;
    color: #eee;
  }
`;

const StyledPrice = styled(Price)<{ type: TransactionType }>`
  font-size: 1.1rem;

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

const Title = styled.span`
  font-weight: bold;
  margin-bottom: 0.3rem;
  font-size: 1.1rem;
`;

const Category = styled.small`
  color: #adadad;
  font-size: 0.8rem;
`;

const MetaLeft = styled.div`
  display: flex;
  flex-direction: column;
`;
const MetaRight = styled.div`
  display: flex;
  align-items: center;
`;

type TransactionListItemProps = {
  title: string;
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
  category,
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
      <MetaLeft>
        <Title>{title}</Title>
        <Category>{category}</Category>
      </MetaLeft>
      <MetaRight>
        <StyledPrice type={type} amount={amount} />
        <CloseButton type={"button"} onClick={remove}>
          x
        </CloseButton>
      </MetaRight>
    </Item>
  );
};

export { TransactionListItem };
