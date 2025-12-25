import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Check for Guest ID cookie
    const guestId = request.cookies.get("param911_guest_id"); // Changed from ram911 for consistency

    if (!guestId) {
        // Generate a simple UUID-like string if UUID package is not available,
        // or use crypto.randomUUID() which is available in Node 19+ / Modern environments
        const newGuestId = crypto.randomUUID();

        response.cookies.set("param911_guest_id", newGuestId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: "/",
        });
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};
