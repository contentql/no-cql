import { isAdminOrAuthor } from '../../access/isAdminOrAuthor'
import { CollectionConfig } from 'payload'

export const Test: CollectionConfig = {
  slug: 'test',
  labels: {
    singular: 'Test',
    plural: 'Tests',
  },
  access: {
    read: () => true,
    update: isAdminOrAuthor,
    delete: isAdminOrAuthor,
    create: isAdminOrAuthor,
  },
  fields: [
    {
      name: 'task',
      label: 'Task',
      type: 'text',
    },
    {
      name: 'completed',
      label: 'Completed',
      type: 'checkbox',
    },
    {
      name: 'completedAt',
      label: 'Completed At',
      type: 'date',
    },
    {
      name: 'version',
      label: 'Version',
      type: 'select',
      options: [
        { label: 'v1', value: 'v1' },
        { label: 'v2', value: 'v2' },
      ],
      defaultValue: 'v2',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
