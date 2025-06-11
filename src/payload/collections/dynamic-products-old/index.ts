import { CollectionConfig } from 'payload'

const DynamicProducts: CollectionConfig = {
  slug: 'dynamic-products',
  admin: {},
  fields: [
    // UnComment the below field if you want to use this collection
    // {
    //   name: 'productTemplate',
    //   label: 'Product Template',
    //   type: 'relationship',
    //   relationTo: 'product-templates',
    // },
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
