import { Block } from 'payload'

const ListConfig: Block = {
  slug: 'ListBlock',
  interfaceName: 'ListType',
  labels: {
    singular: 'List Block',
    plural: 'List Blocks',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      type: 'select',
      name: 'collectionSlug',
      label: 'Collection Slug',
      options: [
        {
          label: 'Blogs',
          value: 'blogs',
        },
        {
          label: 'Tags',
          value: 'tags',
        },
        {
          label: 'Authors',
          value: 'users',
        },
        {
          label: 'Categories',
          value: 'categories',
        },
        {
          label: 'Products',
          value: 'products',
        },
      ],
    },
  ],
}

export default ListConfig
