import { adminOrCurrentUserFieldAccess } from '../../access/adminOrCurrentUserFieldAccess'
import { isAdmin } from '../../access/isAdmin'
import { isAdminFieldAccess } from '../../access/isAdminFieldAccess'
import { slugField } from '../../fields/slug/index'
import { AUTH_GROUP } from '../constants'
import { env } from '@env'
import { tenantsArrayField } from '@payloadcms/plugin-multi-tenant/fields'
import { CollectionConfig } from 'payload'

import { ResetPassword } from '@/emails/reset-password'
import { UserAccountVerification } from '@/emails/verify-email'
import { socialLinksField } from '@/payload/globals/siteSettings/index'

import { isAdminOrCurrentUser } from './access/isAdminOrCurrentUser'
import { authorAccessAfterUpdate } from './hooks/authorAccessAfterUpdate'
import { handleUserRoles } from './hooks/handleUserRoles'
import { preventAdminRoleUpdate } from './hooks/preventAdminRoleUpdate'
import { revalidateAuthors } from './hooks/revalidateAuthors'

const defaultTenantArrayField = tenantsArrayField({
  tenantsArrayFieldName: 'tenants',
  tenantsArrayTenantFieldName: 'tenant',
  tenantsCollectionSlug: 'tenants',
  arrayFieldAccess: {
    //update access controls
    read: () => true,
    update: () => true,
    create: () => true,
  },
  tenantFieldAccess: {
    read: () => true,
    update: () => true,
    create: () => true,
  },
  rowFields: [
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'user'],
      hasMany: false,
      label: 'Tenant Role',
      required: true,
    },
  ],
})

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    group: AUTH_GROUP,
    useAsTitle: 'email',
  },
  auth: {
    cookies: {
      secure: true,
    },
    verify: {
      generateEmailHTML: ({ token, user }) => {
        return UserAccountVerification({
          actionLabel: 'verify your account',
          buttonText: 'Verify Account',
          userName: user.username,
          image: user.avatar,
          href: `${env.PAYLOAD_URL}/verify-email?token=${token}&id=${user.id}`,
        })
      },
    },
    forgotPassword: {
      generateEmailHTML: args => {
        return ResetPassword({
          resetPasswordLink: `${env.PAYLOAD_URL}/reset-password?token=${args?.token}`,
          userFirstName: args?.user.username,
        })
      },
    },
  },
  hooks: {
    afterChange: [revalidateAuthors],
    beforeChange: [
      authorAccessAfterUpdate,
      handleUserRoles,
      preventAdminRoleUpdate,
    ],
  },
  access: {
    admin: async ({ req }) => {
      // added author also to access the admin-panel
      if (req.user) {
        const userRole: string[] = req?.user?.role || []

        const hasAccess = userRole.some(role =>
          ['admin', 'author'].includes(role),
        )

        return hasAccess
      }

      return false
    },
    read: () => true,
    create: isAdmin,
    update: isAdminOrCurrentUser,
    delete: isAdminOrCurrentUser,
  },

  fields: [
    {
      name: 'displayName',
      label: 'Display Name',
      type: 'text',
      saveToJWT: true,
      access: {
        update: adminOrCurrentUserFieldAccess,
      },
    },
    slugField({
      fieldToUse: 'username',
      overrides: {
        name: 'username',
        label: 'Username',
        type: 'text',
        saveToJWT: true,
        required: true,
        unique: true,
        admin: {
          readOnly: false,
          position: undefined,
          disableBulkEdit: false,
        },
      },
    }),
    {
      name: 'imageUrl',
      type: 'upload',
      relationTo: 'media',
      access: {
        update: adminOrCurrentUserFieldAccess,
      },
    },
    // only admin can update the role field
    {
      name: 'role',
      type: 'select',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Author',
          value: 'author',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
      access: {
        create: isAdminFieldAccess,
        update: isAdminFieldAccess,
      },
      saveToJWT: true,
      defaultValue: 'user',
      required: true,
      hasMany: true,
    },
    {
      name: 'emailVerified',
      type: 'date',
      access: {
        create: isAdminFieldAccess,
        update: isAdminFieldAccess,
      },
    },
    {
      type: 'array',
      name: 'socialLinks',
      label: 'Social Links',
      fields: [socialLinksField],
      access: {
        update: adminOrCurrentUserFieldAccess,
      },
    },
    {
      ...defaultTenantArrayField,
      admin: {
        ...(defaultTenantArrayField?.admin || {}),
        position: 'sidebar',
      },
    },
  ],
}
