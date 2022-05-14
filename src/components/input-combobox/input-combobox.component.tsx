import type { FC } from "react";
import { useCallback, useMemo, useState } from "react";
import styled, { useTheme } from "styled-components";
import { Button, ButtonVariant } from "../button";
import { Icon } from "../icon";
import { InputAutocomplete } from "../input-autocomplete/input-autocomplete.component";

const ItemsWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const ItemStyled = styled.span`
  background-color: ${(props) => props.theme.neutralLighter};
  border-radius: 0.25rem;
  padding: 0.25rem 0.15rem 0.25rem 0.5rem;
  display: inline-flex;
  align-items: center;
  font-size: 0.8rem;
  color: ${(props) => props.theme.neutral};
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

type InputComboboxProps = {
  value: Array<InputComboboxValueItem>;
  variants: Array<InputComboboxValueItem>;
  onChange: (value: Array<InputComboboxValueItem>) => void;
};

const InputCombobox: FC<InputComboboxProps> = ({ value, onChange, variants }) => {
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
        variants={autocomleteVariants}
        value={query}
        onChange={setQuery}
        onSelected={change}
      />
    </Container>
  );
};

export { InputCombobox, InputComboboxItem };
export type { InputComboboxValueItem };
