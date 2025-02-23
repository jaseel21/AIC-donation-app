import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // Public routes
  if (pathname === "/auth/signin" || pathname === "/auth/signout" || pathname.startsWith("/donate") || pathname.startsWith("/sponsor") || pathname.startsWith("/box")) {
    return NextResponse.next();
  }

  // Require authentication for protected routes
  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // Role-based access for dashboard (example: only Admin or higher for /dashboard/admin)
  if (pathname.startsWith("/dashboard/admin")) {
    const rolesHierarchy = {
      "User": 0,
      "Volunteer": 1,
      "Staff": 2,
      "Admin": 3,
      "Manager": 4,
      "Super Admin": 5
    };

    if (rolesHierarchy[token.role] < rolesHierarchy["Admin"]) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/volunteer/:path*"],
};