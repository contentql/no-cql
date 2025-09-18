import { User } from '@payload-types'
import { Access } from 'payload'

export const isAdminAccess: Access = ({ req }): boolean => {
  return isAdmin(req.user)
}

export const isAdmin = (user: User | null): boolean => {
  return Boolean(user?.role?.includes('admin'))
}
