import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    const pathname = request.nextUrl.pathname;

    // Define protected routes
    const authorRoutes = ['/api/authorRoutes', '/editBlog', '/previewBlog', '/myBlogs'];
    const adminRoutes = ['/api/adminRoutes', '/authorRequests'];
    const userRoutes = ['/api/userRoutes', '/savedBlogs', '/notifications', '/settings'];

    const isProtectedRoute = [...authorRoutes, ...adminRoutes, ...userRoutes].some(route => pathname.startsWith(route));
    const isApi = pathname.startsWith('/api/');

    let token;
    if (isProtectedRoute) {
        token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
        if (!token) {
            return NextResponse.json({ error: 'You Must Be Signed In' }, { status: 403 });
        }
    }

    const response = NextResponse.next();

    // Apply token-based checks for protected routes
    if (isProtectedRoute) {
        const isAuthor = token?.isAuthor;
        const isAdmin = token?.isAdmin;

        if (authorRoutes.some(route => pathname.startsWith(route)) && !isAuthor) {
            if (isApi) {
                return NextResponse.json({ error: 'For Authors Only' }, { status: 403 });
            } else {
                return NextResponse.redirect('/error?message=Author%20Page%20Only');
            }
        }

        if (adminRoutes.some(route => pathname.startsWith(route)) && !isAdmin) {
            if (isApi) {
                return NextResponse.json({ error: 'For Admin Only' }, { status: 403 });
            } else {
                return NextResponse.redirect('/error?message=Admin%20Page%20Only');
            }
        }

        // Add headers for authenticated users
        response.headers.set('x-user-id', token!.sub as string);
        if (isAuthor) response.headers.set('x-is-author', String(isAuthor));
        if (isAdmin) response.headers.set('x-is-admin', String(isAdmin));
    }

    // Apply Content Security Policy (CSP)
    let cspHeader = '';
    if (process.env.NODE_ENV === 'production') {
        cspHeader = `
        default-src 'self';
        script-src 'self' 'nonce-${nonce}';
        style-src 'self' 'unsafe-inline';
        img-src 'self' blob: data: https://*;
        font-src 'self';
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        upgrade-insecure-requests;
    `;
    } else if (process.env.NODE_ENV === 'development') {
        cspHeader = `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:3000;
        style-src 'self' 'unsafe-inline';
        img-src 'self' blob: data: http://localhost:3000 https://*;
        font-src 'self';
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        upgrade-insecure-requests;
    `;
    }

    const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim();
    response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);
    response.headers.set('x-nonce', nonce);

    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)', // Apply middleware to all routes
    ],
};
