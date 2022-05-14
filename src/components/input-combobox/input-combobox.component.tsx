import type { FC } from "react";
import { forwardRef, useCallback, useMemo, useState } from "react";
import styled, { useTheme } from "styled-components";
import { Button, ButtonVariant } from "../button";
import { Icon } from "../icon";
import type { InputAutocompleteProps } from "../input-autocomplete/input-autocomplete.component";
import { InputAutocomplete } from "../input-autocomplete/input-autocomplete.component";
import type { Merge } from "../../types/merge";
import { Badge } from "../badge";

const ItemsWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const ItemStyled = styled(Badge)`
  padding: 0.25rem 0.15rem 0.25rem 0.5rem;
`;

const ButtonRemove = styled(Button)`
  display: inline-flex;
`;

const InputComboboxItem: FC<{ name: string; onRemove: () => void }> = ({ name, onRemove }) => {
  const theme = useTheme();

  return (
    <ItemStyled>
      {name}{" "}
      <ButtonRemove variant={ButtonVariant.ICON} onClick={onRemove}>
        <Icon name={"close"} size={"1rem"} color={theme.secondary} />
      </ButtonRemove>
    </ItemStyled>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

type InputComboboxValueItem = {
  title: string;
  value: unknown;
};

type InputComboboxProps = Merge<
  [
    InputAutocompleteProps,
    {
      value: Array<InputComboboxValueItem>;
      variants: Array<InputComboboxValueItem>;
      onChange: (value: Array<InputComboboxValueItem>) => void;
    },
  ]
>;

const InputCombobox = forwardRef<HTMLInputElement, InputComboboxProps>(
  ({ value, onChange, variants, ...props }, ref) => {
    const [query, setQuery] = useState("");
    const clearQuery = () => setQuery("");

    const removeVal = (val: string) => {
      onChange(value.filter((valueItem) => valueItem.title !== val));
    };

    const items = value.map((i) => (
      <InputComboboxItem key={i.title} name={i.title} onRemove={() => removeVal(i.title)} />
    ));
    const autocomleteVariants = useMemo(
      () =>
        variants
          .filter((variant) => !value.find((valueItem) => valueItem.title === variant.title))
          .map((variant) => variant.title),
      [value, variants],
    );

    const change = useCallback(
      (val: string) => {
        const fullVal = variants.find((variant) => variant.title === val);

        if (!!fullVal) {
          onChange([fullVal, ...value]);
          clearQuery();
        }
      },
      [onChange, value, variants],
    );

    return (
      <Container>
        <ItemsWrapper>{items}</ItemsWrapper>
        <InputAutocomplete
          {...props}
          ref={ref}
          variants={autocomleteVariants}
          value={query}
          onChange={setQuery}
          onSelected={change}
        />
      </Container>
    );
  },
);

export { InputCombobox, InputComboboxItem };
export type { InputComboboxValueItem, InputComboboxProps };
