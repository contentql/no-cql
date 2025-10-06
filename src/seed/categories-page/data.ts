import { Page } from 'payload-types'

export type CategoriesPageDataType = Omit<
  Page,
  'id' | 'createdAt' | 'updatedAt'
>

export const categoriesPageData: CategoriesPageDataType = {
  title: 'Categories',
  isHome: false,
  _status: 'published',
  layout: [
    {
      blockType: 'ListBlock',
      title: 'Discover Categories',
      collectionSlug: 'categories',
    },
  ],
}
