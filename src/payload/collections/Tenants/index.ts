import { AUTH_GROUP } from '../constants'
import { CollectionConfig } from 'payload'

import { isAdminAccess } from '@/payload/access/isAdmin'

import { updateAndDeleteAccess } from './access/updateAndDelete'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  admin: {
    useAsTitle: 'name',
    group: AUTH_GROUP,
  },
  access: {
    create: isAdminAccess,
    delete: updateAndDeleteAccess,
    read: ({ req }) => Boolean(req.user),
    update: updateAndDeleteAccess,
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      index: true,
      required: true,
      unique: true,
    },
    {
      name: 'subdomain',
      label: 'Subdomain',
      type: 'text',
      index: true,
      required: true,
      unique: true,
    },
  ],
}
