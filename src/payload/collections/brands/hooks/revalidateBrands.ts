import { Brand } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

export const revalidateBrandsAfterChange: CollectionAfterChangeHook<
  Brand
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-brands')
    revalidateTag(`details-brands-${doc?.slug}`)
  }
}

export const revalidateBrandsAfterDelete: CollectionAfterDeleteHook<
  Brand
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-brands')
    revalidateTag(`details-brands-${doc?.slug}`)
  }
}
