import styled, { css } from "styled-components";
import { Price } from "../../../components/price";
import { TransactionType } from "../../models";

const TransactionPrice = styled(Price)<{ type?: TransactionType }>`
  font-size: 1.1rem;

  ${(props) => {
    if (props.type === TransactionType.DEBIT) {
      return css`
        color: green;

        &::before {
          content: "+\u00A0";
        }
      `;
    } else if (props.type === TransactionType.CREDIT) {
      return css`
        color: red;

        &::before {
          content: "-\u00A0";
        }
      `;
    }
  }}
`;

export { TransactionPrice };
