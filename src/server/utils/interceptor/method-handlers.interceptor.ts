import type { Interceptor } from "@marcus-rise/next-api-interceptor";
import type { NextApiHandler } from "next";

enum RequestMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
}

type MethodHandler<Handler extends NextApiHandler = NextApiHandler> = {
  method: RequestMethod | string;
  handler: Handler;
};

const withMethodHandlers =
  (...allowedHandlers: Array<MethodHandler>): Interceptor =>
  (handler: NextApiHandler = () => {}) =>
  async (req, res) => {
    const allowedHandler = allowedHandlers.find((h) => h.method === req.method)?.handler;

    if (!allowedHandler) {
      res.status(405).end();
    } else {
      await allowedHandler(req, res);
    }

    return handler(req, res);
  };

export { withMethodHandlers };
