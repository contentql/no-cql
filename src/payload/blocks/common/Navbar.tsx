'use client'

import CommandBar from '../../../components/CommandBar'
import type { SiteSetting } from '@payload-types'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { generateMenuLinks } from '@/utils/generateMenuLinks'

import ThemeSwitcher from './ThemeSwitcher'

const Navbar = ({ metadata }: { metadata: SiteSetting }) => {
  const { navbar } = metadata
  const { logo, menuLinks } = navbar

  let logoDetails = {
    url: '',
    alt: '',
  }

  const pathname = usePathname()

  const navLinks = menuLinks?.length ? generateMenuLinks(menuLinks) : []

  // Detect if we're using subdomain-based or path-based tenant URLs
  const isSubdomainBased =
    typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname.includes('localhost')

  // Extract tenant slug from pathname for path-based URLs (e.g., /charan/about -> charan)
  const pathSegments = pathname.split('/').filter(Boolean)
  const tenantSlug =
    !isSubdomainBased && pathSegments.length > 0 ? `/${pathSegments[0]}` : ''

  if (Object.keys(logo).length && typeof logo?.imageUrl === 'string') {
    logoDetails = {
      url: logo?.imageUrl,
      alt: `${metadata.general?.title} logo`,
    }
  } else if (
    Object.keys(logo).length &&
    typeof logo.imageUrl === 'object' &&
    logo.imageUrl !== null
  ) {
    logoDetails = {
      url: logo.imageUrl.url!,
      alt: logo.imageUrl.alt || `${metadata.general?.title} logo`,
    }
  }

  // if in case image or nav-links are not specified hiding the navbar
  if (!logoDetails.url && navLinks?.length === 0) {
    return null
  }

  return (
    <header className='fixed left-0 top-0 z-10 w-full bg-secondary/30 backdrop-blur-xl'>
      <div className='container flex h-14 items-center justify-between'>
        {logoDetails.url && (
          <Link href={isSubdomainBased ? '/' : tenantSlug || '/'}>
            <Image
              src={logoDetails.url}
              alt={logoDetails.alt}
              width={24}
              height={24}
            />
          </Link>
        )}

        <div className='hidden items-center gap-8 md:flex'>
          {navLinks?.length > 0 && (
            <nav>
              <ul className='flex gap-8 text-sm'>
                {navLinks.map(({ label, children, href = '', newTab }) => (
                  <Fragment key={label}>
                    {children ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <li className='flex list-none items-center gap-1'>
                            {label}{' '}
                            <ChevronDown className='size-4 text-slate-100' />
                          </li>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {children.map(item => (
                            <DropdownMenuItem key={item.label}>
                              <Link
                                href={
                                  isSubdomainBased
                                    ? item.href
                                    : `${tenantSlug}${item.href}`
                                }
                                target={item.newTab ? '_blank' : '_self'}>
                                {item.label}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Link
                        href={isSubdomainBased ? href : `${tenantSlug}${href}`}
                        target={newTab ? '_blank' : '_self'}>
                        {label}
                      </Link>
                    )}
                  </Fragment>
                ))}
              </ul>
            </nav>
          )}

          <ThemeSwitcher />

          <CommandBar />
        </div>
      </div>
    </header>
  )
}

export default Navbar
