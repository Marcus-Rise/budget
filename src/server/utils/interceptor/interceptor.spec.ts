import type { Interceptor } from "./interceptor";
import { applyInterceptors } from "./interceptor";
import type { NextApiHandler } from "next";

describe("applyInterceptors", () => {
  it("should apply interceptors in args order", () => {
    const stack: string[] = [];
    const int1: Interceptor = (handler) =>
      function int1Handler(req, res) {
        stack.push(int1Handler.name);

        return handler(req, res);
      };
    const int2: Interceptor = (handler) =>
      function int2Handler(req, res) {
        stack.push(int2Handler.name);

        return handler(req, res);
      };
    const int3: Interceptor = (handler) =>
      function int3Handler(req, res) {
        stack.push(int3Handler.name);

        return handler(req, res);
      };

    const originalHandler: NextApiHandler = jest.fn();
    const handler = applyInterceptors(originalHandler, int1, int2, int3);

    handler(Object.create({}), Object.create({}));

    expect(stack).toMatchObject(["int1Handler", "int2Handler", "int3Handler"]);
  });
});
