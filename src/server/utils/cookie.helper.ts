import type { NextApiRequest, NextApiResponse } from "next";
import type { CookieSerializeOptions } from "cookie";
import { serialize } from "cookie";
import { sign, unsign } from "cookie-signature";

const COOKIE_SECRET = process.env.COOKIE_SECRET ?? "";

const CookiesOptions: CookieSerializeOptions = {
  httpOnly: true,
  path: "/",
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
};

const setCookie = (
  res: NextApiResponse,
  name: string,
  value: string,
  options?: CookieSerializeOptions,
): void => {
  const stringValue = typeof value === "object" ? `j:${JSON.stringify(value)}` : String(value);
  let expires: CookieSerializeOptions["expires"];

  const opts: CookieSerializeOptions = {
    ...CookiesOptions,
    ...options,
  };

  if (typeof opts.maxAge === "number") {
    expires = new Date(Date.now() + opts.maxAge * 1000);
  }

  const signedValue = sign(stringValue, COOKIE_SECRET);

  res.setHeader("Set-Cookie", serialize(name, signedValue, { ...opts, expires }));
};

const getCookies = (req: NextApiRequest, name: string) => {
  const cookie = req.cookies[name];

  if (!!cookie) {
    return unsign(cookie, COOKIE_SECRET);
  }
};

const removeCookie = (res: NextApiResponse, name: string) =>
  res.setHeader("Set-Cookie", serialize(name, "", { maxAge: -1, path: "/" }));

export { setCookie, getCookies, removeCookie, CookiesOptions, COOKIE_SECRET };
