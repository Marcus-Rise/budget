import { render, screen, fireEvent } from "@testing-library/react";
import type { FC } from "react";
import { useState } from "react";
import type { InputAutocompleteProps } from "./input-autocomplete.component";
import { InputAutocomplete } from "./input-autocomplete.component";

const InputWrapper: FC<InputAutocompleteProps> = (props) => {
  const [val, setVal] = useState(props.value);

  return <InputAutocomplete {...props} value={val} onChange={setVal} />;
};

describe("InputAutocomplete", () => {
  it("should change value by selecting variant", () => {
    render(<InputWrapper variants={["foo", "bar", "baz"]} value={""} onChange={() => {}} />);

    const input = screen.getByTestId<HTMLInputElement>("input");

    const variantText = "foo";
    const variant = screen.getByText(variantText);

    fireEvent.focus(input);

    fireEvent.click(variant);

    expect(screen.queryByText(variantText)).toBeNull();

    expect(input.value).toEqual(variantText);
  });

  it("should appear label", () => {
    const label = "Label";
    render(
      <InputWrapper
        label={label}
        variants={["foo", "bar", "baz"]}
        value={""}
        onChange={() => {}}
      />,
    );

    expect(screen.queryByText(label)).toBeNull();

    const input = screen.getByTestId<HTMLInputElement>("input");

    const variantText = "foo";
    const variant = screen.getByText(variantText);

    fireEvent.focus(input);

    fireEvent.click(variant);

    expect(screen.queryByText(variantText)).toBeNull();

    expect(input.value).toEqual(variantText);

    expect(screen.getByText(label)).not.toBeNull();
  });
});
