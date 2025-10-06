import { Page } from 'payload-types'

export type CategoryDetailsPageDataType = Omit<
  Page,
  'id' | 'createdAt' | 'updatedAt'
>

export const categoryDetailsPageData: CategoryDetailsPageDataType = {
  title: 'Category Details',
  isHome: false,
  _status: 'published',
  layout: [
    {
      blockType: 'DetailsBlock',
      collectionSlug: 'categories',
    },
  ],
  isDynamic: true,
}
