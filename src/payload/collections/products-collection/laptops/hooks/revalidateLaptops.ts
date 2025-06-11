import { Laptop } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

export const revalidateLaptopsAfterChange: CollectionAfterChangeHook<
  Laptop
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-laptops')
    revalidateTag(`details-laptops-${doc?.slug}`)
  }
}

export const revalidateLaptopsAfterDelete: CollectionAfterDeleteHook<
  Laptop
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-laptops')
    revalidateTag(`details-laptops-${doc?.slug}`)
  }
}
