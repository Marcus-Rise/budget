import type { NextMiddleware } from "next/server";
import { NextResponse } from "next/server";

const ForgotPasswordMiddleware: NextMiddleware = (request) => {
  const { auth } = request.cookies;

  if (auth) {
    const url = request.nextUrl.clone();
    url.pathname = "/profile";

    return NextResponse.redirect(url);
  }
};

export { ForgotPasswordMiddleware as middleware };
