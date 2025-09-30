import { AUTH_GROUP } from '../constants'
import { CollectionConfig } from 'payload'

import { adminOrTenantAdminAccess } from '@/payload/access/adminOrTenantAdmin'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  admin: {
    useAsTitle: 'name',
    group: AUTH_GROUP,
  },
  access: {
    create: adminOrTenantAdminAccess,
    delete: adminOrTenantAdminAccess,
    read: ({ req }) => Boolean(req.user),
    update: adminOrTenantAdminAccess,
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
