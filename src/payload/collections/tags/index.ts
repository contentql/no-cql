import { slugField } from '../../fields/slug/index'
import { CONTENT_GROUP } from '../constants'
import { CollectionConfig } from 'payload'

import { adminOrTenantAdminAccess } from '@/payload/access/adminOrTenantAdmin'

import {
  revalidateTags,
  revalidateTagsAfterDelete,
} from './hooks/revalidateTags'

export const Tags: CollectionConfig = {
  slug: 'tags',
  labels: {
    singular: 'Tag',
    plural: 'Tags',
  },
  access: {
    read: () => true,
    create: adminOrTenantAdminAccess,
    update: adminOrTenantAdminAccess,
    delete: adminOrTenantAdminAccess,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'path', 'updatedAt', 'createdAt'],
    group: CONTENT_GROUP,
  },
  versions: {
    drafts: {
      autosave: false,
    },
    maxPerDoc: 10,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Tag',
          fields: [
            {
              name: 'tagImage',
              label: 'Tag Image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Upload tag image',
              },
            },
            {
              name: 'title',
              label: 'Title',
              type: 'text',
              required: true,
              unique: true,
            },
            {
              name: 'description',
              label: 'Description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'color',
              label: 'Tag Color',
              type: 'select',
              defaultValue: 'blue',
              options: [
                { label: 'Blue', value: 'blue' },
                { label: 'Gray', value: 'gray' },
                { label: 'Red', value: 'red' },
                { label: 'Green', value: 'green' },
                { label: 'Yellow', value: 'yellow' },
                { label: 'Indigo', value: 'indigo' },
                { label: 'Purple', value: 'purple' },
                { label: 'Pink', value: 'pink' },
              ],
            },
          ],
        },
      ],
    },
    slugField({ fieldToUse: 'title' }),
  ],
  hooks: {
    afterChange: [revalidateTags],
    afterDelete: [revalidateTagsAfterDelete],
  },
}
