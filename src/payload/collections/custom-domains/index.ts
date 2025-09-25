import { AUTH_GROUP } from '../constants'
import { CollectionConfig } from 'payload'

import { adminOrTenantAdminAccess } from '@/payload/access/adminOrTenantAdmin'

export const CustomDomains: CollectionConfig = {
  slug: 'customDomains',
  labels: {
    singular: 'CustomDomain',
    plural: 'CustomDomains',
  },
  access: {
    read: () => true,
    create: adminOrTenantAdminAccess,
    update: adminOrTenantAdminAccess,
    delete: adminOrTenantAdminAccess,
  },
  admin: {
    useAsTitle: 'hostname',
    group: AUTH_GROUP,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'hostname',
      type: 'text',
      admin: {
        description: 'The custom domain hostname (e.g., example.com)',
      },
      required: true,
    },
  ],
  hooks: {},
}
