import type { NextApiHandler } from "next";
import { removeCookie } from "../../../src/server/cookie";

const LogoutHandler: NextApiHandler = (req, res) => {
  removeCookie(res, "auth");

  res.status(200).end();
};

export default LogoutHandler;
