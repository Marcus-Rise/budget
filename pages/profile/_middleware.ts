import type { NextMiddleware } from "next/server";
import { NextResponse } from "next/server";

const ProfileMiddleware: NextMiddleware = (request) => {
  const { auth } = request.cookies;

  if (!auth) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";

    return NextResponse.redirect(url);
  }
};

export { ProfileMiddleware as middleware };
