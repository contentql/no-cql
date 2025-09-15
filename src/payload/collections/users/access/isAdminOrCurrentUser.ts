import { Access } from 'payload'

export const isAdminOrCurrentUser: Access = ({ req }) => {
  if (req.user) {
    const userRoles = req?.user?.role || []

    if (userRoles.some(role => ['super-admin', 'admin'].includes(role))) {
      return true
    }

    return { id: { equals: req.user?.id } }
  }

  return false
}
