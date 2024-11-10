import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("user_token");

  if (
    !token &&
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    const response = NextResponse.redirect(
      new URL("/auth/signin", request.url)
    );
    response.headers.set("Cache-Control", "no-store");
    return response;
  }

  if (token && request.nextUrl.pathname.startsWith("/auth/signin")) {
    const response = NextResponse.redirect(new URL("/dashboard", request.url));
    response.headers.set("Cache-Control", "no-store");
    return response;
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/signin"],
};
