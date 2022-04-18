import { forwardRef, useCallback, useMemo } from "react";
import type { InputTextProps } from "../input-text";
import { InputText } from "../input-text";
import styled from "styled-components";
import type { Merge } from "../../types/Merge";

const Root = styled.div`
  position: relative;
  display: inline-block;
`;

const Input = styled(InputText)`
  width: 100%;
`;

const Variant = styled.li`
  padding: 0.75rem 1rem;

  &:hover {
    cursor: pointer;
    background-color: #eeeeee;
  }

  &:last-child {
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
`;

const VariantContainer = styled.ul`
  display: none;

  ${Root}:hover > & {
    display: block !important;
  }

  background-color: white;
  position: absolute;
  left: 0;
  top: 0;
  box-shadow: 0 1px 3px 1px #000000a3;
  padding: 0;
  width: 100%;
  margin-top: 2.5rem;
  list-style: none;
  max-width: 30vw;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  z-index: 2;
`;

type InputAutocompleteProps = Merge<
  [
    InputTextProps,
    {
      variants: string[];
      value: string;
    },
  ]
>;

const formatString = (str: string): string => {
  return str.toLowerCase().replace(" ", "");
};
const compareStrings = (str1: string, str2: string): boolean => {
  const left = formatString(str1);
  const right = formatString(str2);

  return (left.includes(right) || right.includes(left)) && left !== right;
};

const InputAutocomplete = forwardRef<HTMLInputElement, InputAutocompleteProps>((props, ref) => {
  const filteredVariants: string[] = useMemo(
    () =>
      !!props.value ? props.variants.filter((i) => compareStrings(i, props.value)) : props.variants,
    [props.value, props.variants],
  );

  const select = useCallback(
    (val: string) => {
      return () => {
        props.onChange(val);
      };
    },
    [props],
  );

  const variants = useMemo(
    () =>
      filteredVariants.map((i) => (
        <Variant key={i} onClick={select(i)}>
          {i}
        </Variant>
      )),
    [filteredVariants, select],
  );

  return (
    <Root>
      <Input {...props} ref={ref} />
      {!!variants.length && <VariantContainer>{variants}</VariantContainer>}
    </Root>
  );
});

export { InputAutocomplete };
