import { isAdmin } from '../../access/isAdmin'
import { E_COMMERCE_GROUP } from '../constants'
import { CollectionConfig } from 'payload'

import { slugField } from '@/payload/fields/slug'

import {
  revalidateBrandsAfterChange,
  revalidateBrandsAfterDelete,
} from './hooks/revalidateBrands'

export const Brands: CollectionConfig = {
  slug: 'brands',
  labels: {
    singular: 'Brand',
    plural: 'Brands',
  },
  admin: {
    useAsTitle: 'name',
    group: E_COMMERCE_GROUP,
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [revalidateBrandsAfterChange],
    afterDelete: [revalidateBrandsAfterDelete],
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic Information',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  admin: {
                    placeholder: 'Enter brand name',
                    description:
                      'The name of the brand. This will be displayed across the application.',
                  },
                },
                slugField({
                  fieldToUse: 'name',
                  overrides: {
                    name: 'slug',
                    type: 'text',
                    required: true,
                    admin: {
                      placeholder: 'Auto-generated slug based on brand name',
                      description: 'SEO-friendly URL for this brand.',
                    },
                  },
                }),
              ],
            },
            {
              name: 'description',
              type: 'textarea',
              admin: {
                description:
                  'Provide a rich text description to explain this brand.',
              },
            },
          ],
        },
        {
          label: 'Images and Media',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Brand Image',
              admin: {
                description: 'Upload an image that represents this brand.',
              },
            },
          ],
        },
      ],
    },
  ],
}
