import { ElectricalCurtain } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

export const revalidateElectricalCurtainsAfterChange: CollectionAfterChangeHook<
  ElectricalCurtain
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-electrical-curtains')
    revalidateTag(`details-electrical-curtains-${doc?.slug}`)
  }
}

export const revalidateElectricalCurtainsAfterDelete: CollectionAfterDeleteHook<
  ElectricalCurtain
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-electrical-curtains')
    revalidateTag(`details-electrical-curtains-${doc?.slug}`)
  }
}
