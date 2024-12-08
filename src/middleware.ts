// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { getToken } from 'next-auth/jwt';

// export async function middleware(request: NextRequest) {
//     console.log('running middleware')
//     const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
//     // If no token is found, deny access
//     if (!token) {
//         return NextResponse.json({ error: 'You Must Be Signed In' }, { status: 403 });
//     }

//     const pathname = request.nextUrl.pathname;
//     const isAuthor = token?.isAuthor;
//     const isAdmin = token?.isAdmin;

//     // Separate author and user routes
//     const authorRoutes = ['/api/authorRoutes', '/editBlog', '/previewBlog', '/myBlogs'];
//     const isApi = pathname.startsWith('/api/');
//     const response = NextResponse.next();

//     // Handle author-specific routes    
//     if (authorRoutes.some(route => pathname.startsWith(route))) {
//         // handle redirects or messages
//         if (!isAuthor) {
//             if (isApi) {
//                 // Send message if trying to access protected api
//                 return NextResponse.json({ error: 'For Authors Only' }, { status: 403 });
//             } else {
//                 // Redirect unauthorized users attempting to access author routes
//                 return NextResponse.json({ error: 'Author Page Only' }, { status: 403 })
//             }
//         } else {
//             // set the headers
//             response.headers.set('x-is-author', String(isAuthor));
//         }
//     }

//     const adminRoutes = ['/api/adminRoutes', '/authorRequests'];
//     if (adminRoutes.some(route => pathname.startsWith(route))) {
//         // handle redirects or messages
//         if (!isAdmin) {
//             if (isApi) {
//                 // Send message if trying to access protected api
//                 return NextResponse.json({ error: 'For Admin Only' }, { status: 403 });
//             } else {
//                 // Redirect unauthorized users attempting to access author routes
//                 return NextResponse.json({ error: 'Admin Page Only' }, { status: 403 })
//             }
//         } else {
//             // set the headers
//             response.headers.set('x-is-admin', String(isAdmin));
//         }
//     }

//     // set headers to basic user (not author or admin) middleware checks pass
//     response.headers.set('x-user-id', token.sub as string); // Add the user ID to headers
//     return response;
// }

// export const config = {
//     matcher: [
//         // Admin Routes
//         '/api/adminRoutes',
//         '/authorRequests',
//         // Author Routes
//         '/api/authorRoutes/:path*',
//         '/editBlog/:path*',
//         '/previewBlog/:path*',
//         // User Routes
//         '/api/userRoutes/:path*',
//         '/myBlogs',
//         '/savedBlogs'
//     ]
// }

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    const pathname = request.nextUrl.pathname;

    // Define protected routes
    const authorRoutes = ['/api/authorRoutes', '/editBlog', '/previewBlog', '/myBlogs'];
    const adminRoutes = ['/api/adminRoutes', '/authorRequests'];
    const userRoutes = ['/api/userRoutes', '/savedBlogs'];

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
        img-src 'self' blob: data:;
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
        img-src 'self' blob: data: http://localhost:3000;
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
