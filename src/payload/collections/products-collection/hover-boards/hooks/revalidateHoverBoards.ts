import { HoverBoard } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

export const revalidateHoverBoardsAfterChange: CollectionAfterChangeHook<
  HoverBoard
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-hover-boards')
    revalidateTag(`details-hover-boards-${doc?.slug}`)
  }
}

export const revalidateHoverBoardsAfterDelete: CollectionAfterDeleteHook<
  HoverBoard
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-hover-boards')
    revalidateTag(`details-hover-boards-${doc?.slug}`)
  }
}
