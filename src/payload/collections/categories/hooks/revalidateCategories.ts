import { Category } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

export const revalidateCategoriesAfterChange: CollectionAfterChangeHook<
  Category
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-categories')
    revalidateTag(`details-categories-${doc?.slug}`)
  }
}

export const revalidateCategoriesAfterDelete: CollectionAfterDeleteHook<
  Category
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-categories')
    revalidateTag(`details-categories-${doc?.slug}`)
  }
}
