import type { NextApiHandler } from "next";
import {
  applyInterceptors,
  parseJwtPayload,
  withAuth,
  withMethodHandlers,
} from "../../../src/server/utils/interceptor";
import type { IUser } from "../../../src/user";

const Me: NextApiHandler<IUser> = (req, res) => {
  const { username } = parseJwtPayload(req);

  return res.status(200).json({ login: username });
};

export default applyInterceptors(
  () => {},
  withAuth,
  withMethodHandlers({ method: "GET", handler: Me }),
);
