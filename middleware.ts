import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Create the default next-intl middleware
const intlMiddleware = createMiddleware(routing);

// Export a custom middleware that handles all paths
export async function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;

    // Log the request for debugging
    console.log(`Processing request for path: ${pathname}`);

    // Handle root path explicitly
    if (pathname === "/") {
      const defaultLocale = routing.defaultLocale;
      return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
    }

    // If it starts with a valid locale, use the intl middleware
    if (/^\/(?:en|fi)(?:$|\/)/.test(pathname)) {
      return intlMiddleware(request);
    }

    // For any other path at root level, redirect to the default locale version
    const defaultLocale = routing.defaultLocale;
    console.log(
      `Redirecting to default locale (${defaultLocale}) for path: ${pathname}`
    );
    const response = NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
    return response;
  } catch (error) {
    console.error("Middleware error:", error);
    // Return a basic response to prevent complete failure
    return new NextResponse(null, { status: 500 });
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)", "/"],
};
