import { FieldAccess } from 'payload'

export const isAdminFieldAccess: FieldAccess = ({ req }) => {
  if (req?.user) {
    const userRoles = req.user?.role || []

    return userRoles.some(role => ['super-admin', 'admin'].includes(role))
  }

  return false
}
