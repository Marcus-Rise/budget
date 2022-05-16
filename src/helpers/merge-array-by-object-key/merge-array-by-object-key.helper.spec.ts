import { mergeArrayByObjectKeyHelper } from "./merge-array-by-object-key.helper";

describe("mergeArrayByObjectKeyHelper", () => {
  it("should merge array", () => {
    const arr = [
      { title: "Title", value: "Value" },
      { title: "Title3", value: "Value" },
      { title: "Title2", value: "Value2" },
    ];
    const [newValue, , anotherValue] = arr;

    expect(mergeArrayByObjectKeyHelper(arr, "value")).toMatchObject([newValue, anotherValue]);
  });
});
