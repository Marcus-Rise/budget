import type { NextApiHandler } from "next";
import {
  parseJwtPayload,
  withAuth,
  withMethodHandlers,
} from "../../../src/server/utils/interceptor";
import type { IUser } from "../../../src/user";
import { applyInterceptors } from "@marcus-rise/next-api-interceptor";

const Me: NextApiHandler<IUser> = (req, res) => {
  const { username } = parseJwtPayload(req);

  return res.status(200).json({ login: username });
};

export default applyInterceptors(
  () => {},
  withAuth,
  withMethodHandlers({ method: "GET", handler: Me }),
);
