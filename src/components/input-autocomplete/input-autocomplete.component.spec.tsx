import { render, screen, fireEvent } from "@testing-library/react";
import * as stories from "./input-autocomplete.stories";
import { composeStories } from "@storybook/testing-react";

const { Default, Labeled } = composeStories(stories);

describe("InputAutocomplete", () => {
  it("should change value by typing", () => {
    render(<Default />);

    const input = screen.getByTestId<HTMLInputElement>("input");

    const value = "awdawd";

    fireEvent.input(input, {
      target: {
        value,
      },
    });

    expect(input.value).toEqual(value);
  });

  it("should change value by selecting variant", () => {
    render(<Default />);

    const input = screen.getByTestId<HTMLInputElement>("input");

    const variantText = "foo";
    const variant = screen.getByText(variantText);

    fireEvent.focus(input);

    fireEvent.click(variant);

    expect(screen.queryByText(variantText)).toBeNull();

    expect(input.value).toEqual(variantText);
  });

  it("should appear label", () => {
    render(<Labeled />);

    expect(screen.queryByText("Label")).toBeNull();

    const input = screen.getByTestId<HTMLInputElement>("input");

    const variantText = "foo";
    const variant = screen.getByText(variantText);

    fireEvent.focus(input);

    fireEvent.click(variant);

    expect(screen.queryByText(variantText)).toBeNull();

    expect(input.value).toEqual(variantText);

    expect(screen.getByText("Label")).not.toBeNull();
  });
});
