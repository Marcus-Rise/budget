/* eslint-disable @next/next/no-server-import-in-page */
import type { NextApiRequest, NextApiResponse } from "next";
import type { CookieSerializeOptions } from "cookie";
import { serialize } from "cookie";
import { sign, unsign } from "cookie-signature";
import type { ServerResponse } from "http";
import type { NextRequest } from "next/server";

const COOKIE_SECRET = process.env.COOKIE_SECRET ?? "";

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

  const signedValue = sign(stringValue, COOKIE_SECRET);

  res.setHeader("Set-Cookie", serialize(name, signedValue, { ...options, expires }));
};

const getCookies = (req: NextApiRequest | NextRequest, name: string) => {
  const cookie = req.cookies[name];

  if (!!cookie) {
    return unsign(cookie, COOKIE_SECRET);
  }
};

const removeCookie = (res: Handler, name: string) => {
  setCookie(res, name, "", {
    path: "/",
    maxAge: 1,
  });
};

export { setCookie, getCookies, removeCookie, CookiesOptions, COOKIE_SECRET };
