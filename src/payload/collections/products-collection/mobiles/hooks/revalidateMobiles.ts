import { Mobile } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

export const revalidateMobilesAfterChange: CollectionAfterChangeHook<
  Mobile
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-mobiles')
    revalidateTag(`details-mobiles-${doc?.slug}`)
  }
}

export const revalidateMobilesAfterDelete: CollectionAfterDeleteHook<
  Mobile
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-mobiles')
    revalidateTag(`details-mobiles-${doc?.slug}`)
  }
}
