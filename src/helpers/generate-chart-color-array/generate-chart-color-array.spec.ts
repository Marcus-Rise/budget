import { generateChartColorArray, generateColor } from "./generate-chart-color-array.helper";

describe("GenerateChartColorArrayHelper", () => {
  describe("generateColor", () => {
    it("should generate color", () => {
      expect(generateColor()).toHaveLength(7);
    });

    it("should generate different colors", () => {
      expect(generateColor()).not.toEqual(generateColor());
    });
  });

  describe("generateArrayOfColors", () => {
    it("should generate array of different colors", () => {
      const length = 5;
      const arr = generateChartColorArray(length);
      const unique = new Set(arr);

      expect(unique.size).toBe(length);
    });
  });
});
