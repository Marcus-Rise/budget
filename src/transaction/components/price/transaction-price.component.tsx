import styled, { css } from "styled-components";
import { Price } from "../../../components/price";
import { TransactionType } from "../../models";

const TransactionPrice = styled(Price)<{ type: TransactionType }>`
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

export { TransactionPrice };
