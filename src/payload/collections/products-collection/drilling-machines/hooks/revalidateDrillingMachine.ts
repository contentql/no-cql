import { DrillingMachine } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

export const revalidateDrillingMachineAfterChange: CollectionAfterChangeHook<
  DrillingMachine
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-drilling-machines')
    revalidateTag(`details-drilling-machines-${doc?.slug}`)
  }
}

export const revalidateDrillingMachineAfterDelete: CollectionAfterDeleteHook<
  DrillingMachine
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-drilling-machines')
    revalidateTag(`details-drilling-machines-${doc?.slug}`)
  }
}
