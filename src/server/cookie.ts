import type { NextApiResponse } from "next";
import type { CookieSerializeOptions } from "cookie";
import { serialize } from "cookie";
import type { ServerResponse } from "http";

const CookiesOptions: CookieSerializeOptions = {
  httpOnly: true,
  maxAge: parseInt(process.env.COOKIE_TTL ?? ""),
  path: "/",
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
};
type Handler = NextApiResponse | ServerResponse;

const setCookie = (res: Handler, name: string, value: string, options = CookiesOptions): void => {
  const stringValue = typeof value === "object" ? `j:${JSON.stringify(value)}` : String(value);
  let expires: CookieSerializeOptions["expires"];

  if (typeof options.maxAge === "number") {
    expires = new Date(Date.now() + options.maxAge * 1000);
  }

  res.setHeader("Set-Cookie", serialize(name, stringValue, { ...options, expires }));
};

const removeCookie = (res: Handler, name: string) => {
  setCookie(res, name, "", {
    path: "/",
    maxAge: 1,
  });
};

export { setCookie, removeCookie };
