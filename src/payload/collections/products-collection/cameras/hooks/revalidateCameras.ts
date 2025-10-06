import { Camera } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

export const revalidateCamerasAfterChange: CollectionAfterChangeHook<
  Camera
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-cameras')
    revalidateTag(`details-cameras-${doc?.slug}`)
  }
}

export const revalidateCamerasAfterDelete: CollectionAfterDeleteHook<
  Camera
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-cameras')
    revalidateTag(`details-cameras-${doc?.slug}`)
  }
}
