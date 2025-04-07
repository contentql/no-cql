import { isAdminOrAuthor } from '../../access/isAdminOrAuthor'
import { UPLOADS_GROUP } from '../constants'
import path from 'path'
import { CollectionConfig, Field } from 'payload'
import { fileURLToPath } from 'url'

const urlField: Field = {
  name: 'url',
  type: 'text',
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    update: isAdminOrAuthor,
    delete: isAdminOrAuthor,
    create: () => true,
  },
  admin: {
    group: UPLOADS_GROUP,
  },
  upload: {
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        position: 'centre',
      },
      {
        name: 'blogImageSize2',
        width: 986,
        position: 'centre',
      },
      {
        name: 'blogImageSize3',
        width: 1470,
        position: 'centre',
      },
    ],
    focalPoint: true,
    crop: true,
    staticDir: path.resolve(dirname, '../../../../public/media'),
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
    },
    // The following fields should be able to be merged in to default upload fields
    urlField,
    {
      name: 'sizes',
      type: 'group',
      fields: [
        {
          name: 'square',
          type: 'group',
          fields: [urlField],
        },
      ],
    },
  ],
}
