import type { NextApiHandler } from "next";
import Cookies from "cookies";

const LoginHandler: NextApiHandler = (req, res) => {
  const cookies = new Cookies(req, res, {
    keys: ["auth"],
    secure: process.env.NODE_ENV === "production",
  });

  cookies.set("auth", "test", {
    httpOnly: true,
    maxAge: 2592000,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });

  res.status(200).end();
};

export default LoginHandler;
