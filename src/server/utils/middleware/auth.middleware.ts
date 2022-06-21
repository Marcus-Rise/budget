/* eslint-disable @next/next/no-server-import-in-page */
import type { NextMiddleware } from "next/server";
import { NextResponse } from "next/server";

const MustBeAuthedMiddleware: NextMiddleware = (request) => {
  const { auth } = request.cookies;

  if (!auth) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";

    return NextResponse.redirect(url);
  }
};

const MustBeNotAuthedMiddleware: NextMiddleware = (request) => {
  const { auth } = request.cookies;

  if (auth) {
    const url = request.nextUrl.clone();
    url.pathname = "/profile";

    return NextResponse.redirect(url);
  }
};

export { MustBeAuthedMiddleware, MustBeNotAuthedMiddleware };
