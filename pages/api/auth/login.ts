import type { NextApiHandler } from "next";
import { setCookie } from "../../../src/server/cookie";

const LoginHandler: NextApiHandler = (req, res) => {
  setCookie(res, "auth", "test");

  res.status(200).end();
};

export default LoginHandler;
