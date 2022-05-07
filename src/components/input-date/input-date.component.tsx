import { forwardRef, useCallback, useMemo } from "react";
import type { ReactDatePickerProps } from "react-datepicker";
import DatePicker, { registerLocale } from "react-datepicker";
import format from "date-fns/format";
import locale from "date-fns/locale/ru";
import type { Merge } from "../../types/merge";
import { Input } from "../input";
import styled from "styled-components";

registerLocale("ru", locale);

const StyledInput = styled(Input).attrs(() => ({
  type: "date",
  readOnly: true,
}))`
  width: 100%;
`;

type BaseReactDatePickerProps = Omit<
  ReactDatePickerProps,
  "customInput" | "customInputRef" | "locale" | "value"
>;
type InputDateProps = Merge<
  [
    BaseReactDatePickerProps,
    {
      onChange: (val?: Date | null) => void;
      value?: Date | null | string | number;
      label?: string;
      error?: string;
    },
  ]
>;

const DATE_MASK = "yyyy-MM-dd";

const InputDate = forwardRef<HTMLInputElement, InputDateProps>(
  ({ onChange, value, label, error, ...props }, ref) => {
    const change = useCallback(
      (val?: Date | null) => {
        onChange(val);
      },
      [onChange],
    );

    const dateVal: string | undefined = useMemo(() => {
      if (value) {
        switch (typeof value) {
          case "object": {
            return format(value, DATE_MASK);
          }
          case "number": {
            return format(new Date(value), DATE_MASK);
          }
          default: {
            return value;
          }
        }
      }
    }, [value]);

    return (
      <DatePicker
        {...props}
        value={dateVal}
        onChange={change}
        locale="ru"
        customInputRef={ref as unknown as string}
        customInput={<StyledInput type={"date"} label={label} error={error} />}
      />
    );
  },
);

export { InputDate };
