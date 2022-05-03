import styled from "styled-components";
import { useMemo } from "react";

type PriceProps = { amount: number };

const Price = styled.span.attrs<PriceProps, PriceProps>(({ amount }) => {
  const str = useMemo(() => Math.abs(amount).toLocaleString(), [amount]);

  return {
    children: str,
    amount,
  };
})`
  &::after {
    content: "\u00A0₽";
  }
`;

export { Price };
