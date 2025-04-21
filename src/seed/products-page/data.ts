import { Page } from 'payload-types'

export type ProductsPageDataType = Omit<Page, 'id' | 'createdAt' | 'updatedAt'>

export const productsPageData: ProductsPageDataType = {
  title: 'Products',
  isHome: false,
  _status: 'published',
  layout: [
    {
      blockType: 'ListBlock',
      title: 'Discover Products',
      collectionSlug: 'products',
    },
  ],
}
