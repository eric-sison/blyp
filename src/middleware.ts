import { NextRequest, NextResponse } from "next/server";
import { ServerSession } from "./lib/auth";

const publicRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/verify-email",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/email-sent",
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(pathname);

  const res = await fetch(`${process.env.BETTER_AUTH_URL}/api/auth/get-session`, {
    method: "GET",
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch session: ${res.statusText}`);
  }

  const session: ServerSession = await res.json();

  // Check if there is no existing session.
  // If no session is established, check if the current route is a public route.
  if (!session) {
    // If so, continue.
    if (isPublicRoute) return NextResponse.next();

    // Otherwise, automatically redirect to the login page.
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // If code execution gets to this point, it means there is an existing session.
  // Check if the current path name is one of the public routes.
  // If so, redirect to the authenticated home page.
  if (publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|webp|gif|ico|ttf|woff|woff2|eot)).*)",
  ],
};
