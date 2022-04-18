import { render, screen, fireEvent } from "@testing-library/react";
import type { InputProps } from "./input.component";
import { Input } from "./input.component";
import type { FC } from "react";
import { useState } from "react";

const InputWrapper: FC<InputProps> = ({ value: val, onChange, ...props }) => {
  const [value, setValue] = useState(val);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);

        if (onChange) {
          onChange(e);
        }
      }}
    />
  );
};

describe("Input", () => {
  it("should have no label by default", () => {
    const label = "Label";
    render(<InputWrapper />);

    expect(screen.queryByText(label)).toBeNull();

    const input = screen.getByTestId<HTMLInputElement>("input");

    fireEvent.input(input, { target: { value: "Value" } });

    expect(screen.queryByText(label)).toBeNull();
  });

  it("should appear label", () => {
    const label = "Label";
    render(<InputWrapper label={label} />);

    expect(screen.queryByText(label)).toBeNull();

    const input = screen.getByTestId<HTMLInputElement>("input");

    fireEvent.input(input, { target: { value: "Value" } });

    expect(screen.getByText(label)).not.toBeNull();
  });

  it("should have a label with placeholder", () => {
    const label = "Label";
    render(<InputWrapper label={label} placeholder={"Placeholder"} />);

    expect(screen.getByText(label)).not.toBeNull();
  });

  it("should have a label with value", () => {
    const label = "Label";
    render(<InputWrapper label={label} value={"Value"} />);

    expect(screen.getByText(label)).not.toBeNull();
  });
});
