import { Vr } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

export const revalidateVrsAfterChange: CollectionAfterChangeHook<Vr> = async ({
  doc,
}) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-vrs')
    revalidateTag(`details-vrs-${doc?.slug}`)
  }
}

export const revalidateVrsAfterDelete: CollectionAfterDeleteHook<Vr> = async ({
  doc,
}) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-vrs')
    revalidateTag(`details-vrs-${doc?.slug}`)
  }
}
