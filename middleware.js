import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Log the token for debugging
  console.log("Token:", token);

  // If no token, redirect to signin
  // if (!token) {
  //   console.log("No token found, redirecting to /signin");
  //   return NextResponse.redirect(new URL("/signin", req.url));
  // }

  const { pathname } = req.nextUrl;

  // Log the pathname and role for debugging
  // console.log("Pathname:", pathname);
  // console.log("User Role:", token.role);

  // Role-based redirects
  if (pathname.startsWith("/admin") && token.role !== "admin") {
    console.log("Not an admin, redirecting to /");
    return NextResponse.redirect(new URL("/", req.url));
  }
  // if (pathname.startsWith("/volunteer") && token.role !== "volunteer") {
  //   console.log("Not a volunteer, redirecting to /");
  //   return NextResponse.redirect(new URL("/", req.url));
  // }
  if (pathname.startsWith("/user") && token.role !== "user") {
    console.log("Not a user, redirecting to /");
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If all checks pass, proceed to the requested page
  console.log("Access granted, proceeding to:", pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/volunteer/:path*", "/user/:path*"],
};