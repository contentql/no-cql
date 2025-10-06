import { Access } from 'payload'

import { getUserTenantIDs } from '@/lib/getUserTenantIDs'
import { isAdmin } from '@/payload/access/isAdmin'

export const updateAndDeleteAccess: Access = ({ req }) => {
  if (!req.user) {
    return false
  }

  if (isAdmin(req.user)) {
    return true
  }

  return {
    id: {
      in: getUserTenantIDs(req.user, 'tenant-admin'),
    },
  }
}
