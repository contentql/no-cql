import { Page } from 'payload-types'

export type authorDetailsPageDataType = Omit<
  Page,
  'id' | 'createdAt' | 'updatedAt'
>

export const authorDetailsPageData: authorDetailsPageDataType = {
  title: 'Authors Details',
  isHome: false,
  _status: 'published',
  layout: [
    {
      blockType: 'DetailsBlock',
      collectionSlug: 'users',
    },
  ],
  isDynamic: true,
}
