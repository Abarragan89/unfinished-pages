import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    console.log('running middleware')
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    // If no token is found, deny access
    if (!token) {
        NextResponse.json({ error: 'Forbidden: Unauthorized access' }, { status: 403 });
        return NextResponse.redirect(new URL('/', request.url))
    } else {
        const response = NextResponse.next();
        response.headers.set('x-user-id', token.sub as string); // Add the user ID to headers
        return response;
    }
}

export const config = {
    matcher: ['/api/authorRoutes', '/editBlog/:path*', '/previewBlog/:path*', '/myBlogs']
}