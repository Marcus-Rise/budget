import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from "./input.component";
import * as stories from "./input.stories";
import { composeStories } from "@storybook/testing-react";

const { Default, Labeled, LabeledWithPlaceholder } = composeStories(stories);

describe("Input", () => {
  it("should have no label by default", () => {
    const label = "Label";
    render(<Default />);

    expect(screen.queryByText(label)).toBeNull();

    const input = screen.getByTestId<HTMLInputElement>("input");

    fireEvent.input(input, { target: { value: "Value" } });

    expect(screen.queryByText(label)).toBeNull();
  });

  it("should appear label", () => {
    const label = "Label";
    render(<Labeled />);

    expect(screen.queryByText(label)).toBeNull();

    const input = screen.getByTestId<HTMLInputElement>("input");

    fireEvent.input(input, { target: { value: "Value" } });

    expect(screen.getByText(label)).not.toBeNull();
  });

  it("should have a label with placeholder", () => {
    const label = "Label";
    render(<LabeledWithPlaceholder />);

    expect(screen.getByText(label)).not.toBeNull();
  });
});
