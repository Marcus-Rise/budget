import type { HtmlHTMLAttributes } from "react";
import { forwardRef, memo } from "react";

type PriceProps = HtmlHTMLAttributes<HTMLSpanElement> & { amount: number };

const Price = memo(
  forwardRef<HTMLSpanElement, PriceProps>(({ amount, ...props }, ref) => {
    const str = Math.abs(amount).toLocaleString();

    return (
      <span {...props} ref={ref}>
        {str}
        {"\u00A0"}₽
      </span>
    );
  }),
);

export { Price };
