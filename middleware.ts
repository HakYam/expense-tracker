import { NextResponse, NextRequest } from "next/server";
import isAuthenticated from "./app/libs/isAuthenticated";


export const config = {
    matcher: ["/api/transaction"], // apply middleware only on paths start with /api/transaction
};

// implement middleware
export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    
    if (pathname.startsWith('/api/transaction')) {
        // check if user is authenticated
        const userId = await isAuthenticated(request);
        if(userId) {
            // Create a response to modify the request
            const response = NextResponse.next();
            // Set the userId cookie
            response.cookies.set('userId', String(userId));
            return response;
        }
    } else {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
        // Default response for non-matching paths
        return NextResponse.next();
}
