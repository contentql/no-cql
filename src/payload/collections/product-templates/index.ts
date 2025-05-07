// collections/ProductTemplates.ts
import { FieldBlocks } from '../field-blocks'
import { CollectionConfig } from 'payload'

const ProductTemplates: CollectionConfig = {
  slug: 'product-templates',
  admin: {
    useAsTitle: 'name',
    hidden: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'fields',
      type: 'blocks',
      blocks: FieldBlocks,
      label: 'Fields for this product type',
    },
  ],
}

export default ProductTemplates
