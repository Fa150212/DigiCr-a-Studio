import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isAdminCookie = req.cookies.get("admin_token")?.value;
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith("/")) {
    // allow login page to be public
    if (url.pathname === "/login") return NextResponse.next();

    if (!isAdminCookie) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

