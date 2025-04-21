import { Page } from 'payload-types'

export type ProductDetailsPageDataType = Omit<
  Page,
  'id' | 'createdAt' | 'updatedAt'
>

export const productDetailsPageData: ProductDetailsPageDataType = {
  title: 'Product Details',
  isHome: false,
  _status: 'published',
  layout: [
    {
      blockType: 'DetailsBlock',
      collectionSlug: 'products',
    },
  ],
  isDynamic: true,
}
