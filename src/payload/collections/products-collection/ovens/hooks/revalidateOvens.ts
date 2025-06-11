import { Oven } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

export const revalidateOvensAfterChange: CollectionAfterChangeHook<
  Oven
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-ovens')
    revalidateTag(`details-ovens-${doc?.slug}`)
  }
}

export const revalidateOvensAfterDelete: CollectionAfterDeleteHook<
  Oven
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-ovens')
    revalidateTag(`details-ovens-${doc?.slug}`)
  }
}
