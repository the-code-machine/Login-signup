import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware to handle routing logic for Auth and Dashboard.
 * This ensures the user is always in the correct state (Logged in vs Logged out).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Retrieve the "isLoggedIn" flag from cookies
  // Note: localStorage is not accessible in Middleware (Server-side).
  // For a real app, you'd use cookies. Here is the logic for redirection:
  const isAuthenticated = request.cookies.get("isLoggedIn")?.value === "true";

  // 2. Redirect root '/' to login
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // 3. Protect Dashboard: If not authenticated, send to login
  if (pathname.startsWith("/dashboard") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // 4. Prevent Logged-in users from seeing Login/Signup again
  if (pathname.startsWith("/auth") && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Apply middleware only to specific routes for performance
export const config = {
  matcher: ["/", "/auth/:path*", "/dashboard/:path*"],
};
