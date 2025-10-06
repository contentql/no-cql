import { isAdmin } from '../../access/isAdmin'
import { E_COMMERCE_GROUP } from '../constants'
import { CollectionConfig } from 'payload'

import { slugField } from '@/payload/fields/slug'

import {
  revalidateCategoriesAfterChange,
  revalidateCategoriesAfterDelete,
} from './hooks/revalidateCategories'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Category',
    plural: 'Categories',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'parentCategory', 'subCategories'],
    group: E_COMMERCE_GROUP,
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [revalidateCategoriesAfterChange],
    afterDelete: [revalidateCategoriesAfterDelete],
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
                    placeholder: 'Enter category name',
                    description:
                      'The name of the category. This will be displayed across the application.',
                  },
                },
                slugField({
                  fieldToUse: 'name',
                  overrides: {
                    name: 'slug',
                    type: 'text',
                    required: true,
                    admin: {
                      placeholder: 'Auto-generated slug based on category name',
                      description: 'SEO-friendly URL for this category.',
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
                  'Provide a rich text description to explain this category.',
              },
            },
          ],
        },
        {
          label: 'Category Hierarchy',
          fields: [
            {
              name: 'parentCategory',
              type: 'relationship',
              relationTo: 'categories',
              label: 'Parent Category',
              admin: {
                description:
                  'Select the parent category if this category belongs to a hierarchy.',
              },
            },
          ],
        },
        {
          label: 'Category Features',
          fields: [
            {
              name: 'isFeatured',
              type: 'checkbox',
              defaultValue: false,
              label: 'Show in Featured Categories',
              admin: {
                description:
                  'Mark this category as featured to highlight it on the homepage or special sections.',
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
              label: 'Category Image',
              required: true,
              admin: {
                description: 'Upload an image that represents this category.',
              },
            },
          ],
        },
      ],
    },
  ],
}
