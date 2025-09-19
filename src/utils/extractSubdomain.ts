import { rootDomain } from '@/utils/rootDomain'
import { type NextRequest } from 'next/server'

export function extractSubdomain({request, hostname}: {request?: NextRequest, hostname?: string}): string | null {
  let url: string
  let finalHostname: string

  if (request) {
    // Server-side: use NextRequest
    console.log('middleware request.url', request.url)
    url = request.url
    const host = request.headers.get('host') || ''
    finalHostname = host.split(':')[0]
  } else if (hostname) {
    // Direct hostname provided
    url = `https://${hostname}`
    finalHostname = hostname
  } else if (typeof window !== 'undefined') {
    // Client-side: use window.location
    url = window.location.href
    finalHostname = window.location.hostname
  } else {
    throw new Error('Either request or hostname must be provided, or use in client-side context')
  }

  // Local development environment
  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    // Try to extract subdomain from the full URL
    const fullUrlMatch = url.match(/http:\/\/([^.]+)\.localhost/)
    if (fullUrlMatch && fullUrlMatch[1]) {
      return fullUrlMatch[1]
    }

    // Fallback to host header approach
    if (finalHostname.includes('.localhost')) {
      return finalHostname.split('.')[0]
    }

    return null
  }

  // Production environment
  const rootDomainFormatted = rootDomain.split(':')[0]

  // Handle preview deployment URLs (tenant---branch-name.vercel.app)
  if (finalHostname.includes('---') && finalHostname.endsWith('.vercel.app')) {
    const parts = finalHostname.split('---')
    return parts.length > 0 ? parts[0] : null
  }

  // Regular subdomain detection
  const isSubdomain =
    finalHostname !== rootDomainFormatted &&
    finalHostname !== `www.${rootDomainFormatted}` &&
    finalHostname.endsWith(`.${rootDomainFormatted}`)

  return isSubdomain ? finalHostname.replace(`.${rootDomainFormatted}`, '') : null
}
