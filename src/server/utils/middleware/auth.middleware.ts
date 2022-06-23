/* eslint-disable @next/next/no-server-import-in-page */
import type { NextMiddleware } from "next/server";
import { NextResponse } from "next/server";
import { getCookies } from "../../cookie";

const MustBeAuthedMiddleware: NextMiddleware = (request) => {
  const auth = getCookies(request, "auth");

  if (!auth) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";

    return NextResponse.redirect(url);
  }
};

const MustBeNotAuthedMiddleware: NextMiddleware = (request) => {
  const auth = getCookies(request, "auth");

  if (auth) {
    const url = request.nextUrl.clone();
    url.pathname = "/profile";

    return NextResponse.redirect(url);
  }
};

export { MustBeAuthedMiddleware, MustBeNotAuthedMiddleware };
