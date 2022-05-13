import { getDateMonthHelper } from "./get-date-month.helper";

describe("getDateMonthHelper", () => {
  it("should retrieve month from date", () => {
    const date = new Date(2022, 4);

    expect(getDateMonthHelper(date)).toEqual("май");
  });
});
