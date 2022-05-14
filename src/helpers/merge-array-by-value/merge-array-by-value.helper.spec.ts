import { mergeArrayByValueHelper } from "./merge-array-by-value.helper";

describe("mergeArrayByValueHelper", () => {
  it("should merge array", () => {
    const newArr = [
      { title: "Title", value: "Value" },
      { title: "Title3", value: "Value" },
      { title: "Title2", value: "Value2" },
    ];
    const [newValue, , anotherValue] = newArr;

    expect(mergeArrayByValueHelper(newArr)).toMatchObject([newValue, anotherValue]);
  });
});
