import { Access } from 'payload'

export const isAdmin: Access = ({ req }) => {
  if (req.user) {
    const userRoles = req?.user?.role || []

    return userRoles.some(role => ['super-admin', 'admin'].includes(role))
  }

  return false
}
