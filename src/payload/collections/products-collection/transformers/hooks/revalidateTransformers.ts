import { Transformer } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

export const revalidateTransformersAfterChange: CollectionAfterChangeHook<
  Transformer
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-transformers')
    revalidateTag(`details-transformers-${doc?.slug}`)
  }
}

export const revalidateTransformersAfterDelete: CollectionAfterDeleteHook<
  Transformer
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-transformers')
    revalidateTag(`details-transformers-${doc?.slug}`)
  }
}
