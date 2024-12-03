import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    console.log('running middleware')
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    // If no token is found, deny access
    if (!token) {
        return NextResponse.json({ error: 'You Must Be Signed In' }, { status: 403 });
    }

    const pathname = request.nextUrl.pathname;
    const isAuthor = token?.isAuthor;
    const isAdmin = token?.isAdmin;

    // Separate author and user routes
    const authorRoutes = ['/api/authorRoutes', '/editBlog', '/previewBlog', '/myBlogs'];
    const isApi = pathname.startsWith('/api/');
    const response = NextResponse.next();

    // Handle author-specific routes    
    if (authorRoutes.some(route => pathname.startsWith(route))) {
        // handle redirects or messages
        if (!isAuthor) {
            if (isApi) {
                // Send message if trying to access protected api
                return NextResponse.json({ error: 'For Authors Only' }, { status: 403 });
            } else {
                // Redirect unauthorized users attempting to access author routes
                return NextResponse.json({ error: 'Author Page Only' }, { status: 403 })
            }
        } else {
            // set the headers
            response.headers.set('x-is-author', String(isAuthor));
        }
    }

    const adminRoutes = ['/api/adminRoutes', '/authorRequests'];
    if (adminRoutes.some(route => pathname.startsWith(route))) {
        // handle redirects or messages
        if (!isAdmin) {
            if (isApi) {
                // Send message if trying to access protected api
                return NextResponse.json({ error: 'For Admin Only' }, { status: 403 });
            } else {
                // Redirect unauthorized users attempting to access author routes
                return NextResponse.json({ error: 'Admin Page Only' }, { status: 403 })
            }
        } else {
            // set the headers
            response.headers.set('x-is-admin', String(isAdmin));
        }
    }

    // set headers to basic user (not author or admin) middleware checks pass
    response.headers.set('x-user-id', token.sub as string); // Add the user ID to headers
    return response;
}

export const config = {
    matcher: [
        // Admin Routes
        '/api/adminRoutes',
        '/authorRequests',
        // Author Routes
        '/api/authorRoutes/:path*',
        '/editBlog/:path*',
        '/previewBlog/:path*',
        // User Routes
        '/api/userRoutes/:path*',
        '/myBlogs',
        '/savedBlogs'
    ]
}