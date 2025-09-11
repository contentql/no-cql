import { isAdmin } from '../../access/isAdmin'
import { layoutField } from '../../fields/layout/index'
import { pathField, pathModeField } from '../../fields/path/index'
import { slugField, slugModeField } from '../../fields/slug/index'
import { CONTENT_GROUP } from '../constants'
import type { CollectionConfig } from 'payload'

import { blocksConfig } from '@/payload/blocks/config'
import homeBlockConfig from '@/payload/blocks/homeBlockConfig'

import {
  revalidatePages,
  revalidatePagesAfterDelete,
} from './hooks/revalidatePages'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  access: {
    read: () => true,
    update: isAdmin,
    create: isAdmin,
    delete: isAdmin,
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
          label: 'Page',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              // unique: true,
            },
            layoutField({
              blocks: blocksConfig.length ? blocksConfig : [homeBlockConfig],
            }),
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'isHome',
          label: 'Home Page',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Check to covert page as Home Page',
          },
        },
        {
          name: 'isDynamic',
          label: 'Dynamic Page',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Check to covert page as Dynamic',
          },
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    slugModeField({
      admin: {
        description:
          'Choose Generate to create a slug automatically or Custom to set your own slug',
      },
    }),
    slugField({ fieldToUse: 'title' }),
    pathModeField({
      admin: {
        description:
          'Choose Generate to create a page-path automatically or Custom to set your own page-path',
      },
    }),
    pathField(),
  ],
  hooks: {
    afterChange: [revalidatePages],
    afterDelete: [revalidatePagesAfterDelete],
  },
}
