import type { NextApiRequest, NextApiResponse } from "next";
import type { CookieSerializeOptions } from "cookie";
import { serialize } from "cookie";
import { sign, unsign } from "cookie-signature";

const COOKIE_SECRET = process.env.COOKIE_SECRET ?? "";

const CookiesOptions: CookieSerializeOptions = {
  httpOnly: true,
  path: "/",
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};

const setCookie = (
  res: NextApiResponse,
  name: string,
  value: string,
  options = CookiesOptions,
): void => {
  const stringValue = typeof value === "object" ? `j:${JSON.stringify(value)}` : String(value);
  let expires: CookieSerializeOptions["expires"];

  if (typeof options.maxAge === "number") {
    expires = new Date(Date.now() + options.maxAge * 1000);
  }

  const signedValue = sign(stringValue, COOKIE_SECRET);

  res.setHeader("Set-Cookie", serialize(name, signedValue, { ...options, expires }));
};

const getCookies = (req: NextApiRequest, name: string) => {
  const cookie = req.cookies[name];

  if (!!cookie) {
    return unsign(cookie, COOKIE_SECRET);
  }
};

const removeCookie = (res: NextApiResponse, name: string) => {
  setCookie(res, name, "", {
    path: "/",
    maxAge: -1,
  });
};

export { setCookie, getCookies, removeCookie, CookiesOptions, COOKIE_SECRET };
