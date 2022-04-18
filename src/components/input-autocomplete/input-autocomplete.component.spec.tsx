import { fireEvent, render, screen } from "@testing-library/react";
import { InputAutocomplete } from "./input-autocomplete.component";
import * as stories from "./input-autocomplete.stories";
import { composeStories } from "@storybook/testing-react";

const { Default, Labeled } = composeStories(stories);

describe("InputAutocomplete", () => {
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
    const label = "Label";
    render(<Labeled />);

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
