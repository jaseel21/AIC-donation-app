import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const path = req.nextUrl.pathname;

      // Public routes
      if (path === "/auth/signin" || path === "/auth/signout" || path.startsWith("/donate") || path.startsWith("/sponsor") || path.startsWith("/box")) {
        return true;
      }

      // Admin routes (Super Admin, Manager, Admin)
      if (path.startsWith("/dashboard")) {
        return ["Super Admin", "Manager", "Admin"].includes(token?.role);
      }

      // Volunteer routes
      if (path.startsWith("/volunteer")) {
        return token?.role === "Volunteer";
      }

      // Require authentication for other routes
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/volunteer/:path*", "/auth/:path*"],
};