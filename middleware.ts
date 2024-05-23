import { NextResponse, NextRequest } from "next/server";
import isAuthenticated from "./app/libs/isAuthenticated";

export const config = {
    matcher: ["/api/transaction/:path*"], // Apply middleware to all paths under /api/transaction
};

export default async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    

    if (pathname.startsWith('/api/transaction')) {
        // Check if user is authenticated
        const userId = await isAuthenticated(request);
        if (userId) {
            // Create a response to modify the request
            const response = NextResponse.next();
            // Set the userId cookie, ensuring userId is a string
            response.cookies.set('userId', String(userId));
            return response;
        } else {
            console.error("Unauthorized access attempt");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    }

    // Default response for non-matching paths
    return NextResponse.next();
}
