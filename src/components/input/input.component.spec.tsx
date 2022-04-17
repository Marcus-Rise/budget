import * as stories from "./input.stories";
import { composeStories } from "@storybook/testing-react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./input.component";

const { Labeled, LabeledWithPlaceholder, LabeledWithValue, Default } = composeStories(stories);

describe("Input", () => {
  it("should have no label by default", () => {
    render(<Default />);

    expect(screen.queryByText("Label")).toBeNull();
  });

  it("should appear label", () => {
    render(<Labeled />);

    expect(screen.queryByText("Label")).toBeNull();

    const input = screen.getByTestId<HTMLInputElement>("input");

    fireEvent.input(input, { target: { value: "Value" } });

    expect(screen.getByText("Label")).not.toBeNull();
  });

  it("should have a label with placeholder", () => {
    render(<LabeledWithPlaceholder />);

    expect(screen.getByText("Label")).not.toBeNull();
  });

  it("should have a label with value", () => {
    render(<LabeledWithValue />);

    expect(screen.getByText("Label")).not.toBeNull();
  });
});
