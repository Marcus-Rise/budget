import type { NextApiResponse } from "next";
import type { CookieSerializeOptions } from "cookie";
import { serialize } from "cookie";

const setCookie = (
  res: NextApiResponse,
  name: string,
  value: string,
  options: CookieSerializeOptions = {
    httpOnly: true,
    maxAge: 2592000,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  },
): void => {
  const stringValue = typeof value === "object" ? `j:${JSON.stringify(value)}` : String(value);

  res.setHeader("Set-Cookie", serialize(name, stringValue, options));
};

const removeCookie = (res: NextApiResponse, name: string) => {
  setCookie(res, name, "0", {
    path: "/",
    maxAge: 1,
  });
};

export { setCookie, removeCookie };
