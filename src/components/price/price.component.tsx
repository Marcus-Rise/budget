import { memo } from "react";

type PriceProps = { amount: number };

const Price = memo<PriceProps>(({ amount }) => {
  const str = amount.toLocaleString();

  return (
    <span>
      {str}
      {"\u00A0"}₽
    </span>
  );
});

export { Price };
