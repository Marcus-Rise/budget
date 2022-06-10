import type { NextApiHandler } from "next";
import { removeCookie } from "../../../src/server/cookie";
import { withMethodHandlers } from "../../../src/server/utils/interceptor";

const LogoutHandler: NextApiHandler = (req, res) => {
  removeCookie(res, "auth");

  res.status(200).end();
};

export default withMethodHandlers({ method: "GET", handler: LogoutHandler })();
