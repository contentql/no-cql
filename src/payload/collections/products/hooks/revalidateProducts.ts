import { Product } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

export const revalidateProductsAfterChange: CollectionAfterChangeHook<
  Product
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-products')
    revalidateTag(`details-products-${doc?.slug}`)
  }
}

export const revalidateProductsAfterDelete: CollectionAfterDeleteHook<
  Product
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-products')
    revalidateTag(`details-products-${doc?.slug}`)
  }
}
