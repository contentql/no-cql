import { type NextRequest, NextResponse } from 'next/server'
import { extractSubdomain } from './utils/extractSubdomain'



export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const subdomain = extractSubdomain({request})

  if (subdomain) {
    // Excluded routes (should not be rewritten)
    const excludedRoutes = [
      '/admin',
      '/sign-in',
      '/sign-up',
      '/forgot-password',
      '/reset-password',
      '/verify-email',
    ]

    if (excludedRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.next()
    }

    const redirectionRoutes = [{old: `/${subdomain}/profile`, new: 'profile'}]

    // Handle specific redirection routes
    if (redirectionRoutes.some(route => pathname === route.old)) {
      const route = redirectionRoutes.find(route => pathname === route.old)
      if (route) {
        return NextResponse.redirect(
          new URL(`/${route.new}`, request.url),
        )
      }
    }

    // Rewrite all other paths on subdomains
    return NextResponse.rewrite(
      new URL(`/${subdomain}${pathname}`, request.url),
    )
  }

  // Root domain → normal access
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|[\\w-]+\\.\\w+).*)',
  ],
}
