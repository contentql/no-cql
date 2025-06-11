import { Printer } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

export const revalidatePrintersAfterChange: CollectionAfterChangeHook<
  Printer
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-printers')
    revalidateTag(`details-printers-${doc?.slug}`)
  }
}

export const revalidatePrintersAfterDelete: CollectionAfterDeleteHook<
  Printer
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-printers')
    revalidateTag(`details-printers-${doc?.slug}`)
  }
}
