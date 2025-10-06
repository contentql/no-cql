import { Drone } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

export const revalidateDronesAfterChange: CollectionAfterChangeHook<
  Drone
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-drones')
    revalidateTag(`details-drones-${doc?.slug}`)
  }
}

export const revalidateDronesAfterDelete: CollectionAfterDeleteHook<
  Drone
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-drones')
    revalidateTag(`details-drones-${doc?.slug}`)
  }
}
