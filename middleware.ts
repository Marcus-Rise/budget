import type { NextMiddleware, NextRequest } from "next/server";
import { NextResponse } from "next/server";

const mustBeAuthed = (request: NextRequest) => {
  const auth = request.cookies.get("auth");

  if (!auth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
};

const mustBeNotAuthed = (request: NextRequest) => {
  const auth = request.cookies.get("auth");

  if (auth) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
};

const middleware: NextMiddleware = (request) => {
  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/registration") ||
    request.nextUrl.pathname.startsWith("/forgot-password")
  ) {
    return mustBeNotAuthed(request);
  }

  if (request.nextUrl.pathname.startsWith("/change-password")) {
    if (!request.nextUrl.searchParams.has("token")) {
      return NextResponse.redirect(new URL("/forgot-password", request.url));
    }

    return mustBeNotAuthed(request);
  }

  if (request.nextUrl.pathname.startsWith("/profile")) {
    return mustBeAuthed(request);
  }

  return NextResponse.next();
};

export { middleware };
