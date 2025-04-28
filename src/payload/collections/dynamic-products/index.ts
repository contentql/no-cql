import { CollectionConfig } from 'payload'

const DynamicProducts: CollectionConfig = {
  slug: 'dynamic-products',
  fields: [
    {
      name: 'template',
      type: 'json',
      label: 'Template',
      required: true,
    },
    {
      name: 'product',
      label: 'Product',
      type: 'json',
      admin: {
        components: {
          Field:
            'src/payload/collections/dynamic-products/custom/RenderFields.tsx',
        },
      },
    },
  ],
}

export default DynamicProducts
