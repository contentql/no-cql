import { Car } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

export const revalidateCarsAfterChange: CollectionAfterChangeHook<
  Car
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-cars')
    revalidateTag(`details-cars-${doc?.slug}`)
  }
}

export const revalidateCarsAfterDelete: CollectionAfterDeleteHook<
  Car
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-cars')
    revalidateTag(`details-cars-${doc?.slug}`)
  }
}
