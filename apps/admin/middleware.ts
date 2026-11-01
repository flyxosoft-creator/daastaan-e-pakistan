import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Protect all /panel/* routes.
 * Reads the session token set by next-auth v5 (auth.js).
 * If no valid session cookie found, redirect to /login.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow the login page and its API routes to pass through
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next()
  }

  // For /panel/* routes check for a session cookie
  if (pathname.startsWith('/panel')) {
    // next-auth v5 session token cookie names
    const sessionToken =
      request.cookies.get('authjs.session-token') ||
      request.cookies.get('__Secure-authjs.session-token') ||
      request.cookies.get('next-auth.session-token') ||
      request.cookies.get('__Secure-next-auth.session-token')

    if (!sessionToken) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
