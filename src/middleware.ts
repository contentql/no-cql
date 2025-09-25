import { env } from '@env'
import payloadConfig from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'

// --- Configuration ---
// Add your production domain here
const MAIN_DOMAIN =
  env.NEXT_PUBLIC_WEBSITE_URL?.replace(/^https?:\/\//, '') || ''

// Paths that should be accessible on the main domain and not treated as tenants
const RESERVED_PATHS = [
  '/admin',
  '/sign-in',
  '/sign-up',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/api',
  '/.next',
]
// --- End Configuration ---

export async function middleware(req: NextRequest) {
  const payload = await getPayload({ config: payloadConfig })
  const url = req.nextUrl.clone()
  const { pathname } = url
  const hostname = req.headers.get('host')

  if (!hostname) {
    return new Response(null, {
      status: 400,
      statusText: 'No hostname provided',
    })
  }

  // Allow reserved paths to pass through without changes
  if (RESERVED_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  const currentHost = hostname.replace(/:\d+$/, '') // Remove port (e.g., :3000)

  // --- Logic for requests on the main domain ---
  if (currentHost === 'localhost' || currentHost === MAIN_DOMAIN) {
    // **THE FIX**: If the request is for the root path, allow it to pass through.
    // This makes localhost:3000 and yourdomain.com accessible.
    if (pathname === '/') {
      return NextResponse.next()
    }

    // For any other path, treat the first segment as a tenant and redirect to the subdomain.
    // e.g., localhost:3000/tenant-name -> tenant-name.localhost:3000
    const tenant = pathname.split('/')[1]
    if (tenant) {
      const pathSuffix = pathname.substring(
        pathname.indexOf(tenant) + tenant.length,
      )
      const protocol = currentHost === 'localhost' ? 'http' : 'https'
      const port = currentHost === 'localhost' ? ':3000' : ''

      const redirectUrl = `${protocol}://${tenant}.${currentHost}${port}${pathSuffix}`
      return NextResponse.redirect(redirectUrl)
    }
  }

  // --- Logic for requests already on a subdomain ---
  const tenantFromSubdomain = currentHost.split('.')[0]
  const isSubdomain = currentHost !== `localhost` && currentHost !== MAIN_DOMAIN

  if (!isSubdomain) {
    const { docs } = await payload.find({
      collection: 'customDomains',
      where: {
        hostname: { equals: currentHost },
      },
      depth: 1,
    })

    const domain = docs.find(doc => doc.hostname === currentHost)
    if (domain) {
      const tenant = domain?.tenant
      if (tenant && typeof tenant === 'object' && tenant.slug) {
        url.pathname = `/${tenant.slug}${pathname}`
        return NextResponse.rewrite(url)
      }
    }
  }

  // Rewrite the path to include the tenant for internal Next.js routing.
  // e.g., A request to tenant-name.localhost:3000/about becomes /tenant-name/about
  if (isSubdomain && tenantFromSubdomain !== 'www') {
    const { docs } = await payload.find({
      collection: 'customDomains',
      where: {
        hostname: { equals: currentHost },
      },
      depth: 1,
    })

    const domain = docs.find(doc => doc.hostname === currentHost)
    if (domain) {
      const tenant = domain?.tenant
      if (tenant && typeof tenant === 'object' && tenant.slug) {
        url.pathname = `/${tenant.slug}${pathname}`
        return NextResponse.rewrite(url)
      }
    }

    url.pathname = `/${tenantFromSubdomain}${pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  runtime: 'nodejs',
  // Match all paths except for static files, images, and other assets.
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
