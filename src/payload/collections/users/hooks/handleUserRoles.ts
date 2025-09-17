import { CollectionBeforeChangeHook } from 'payload'

export const handleUserRoles: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
  originalDoc,
}) => {
  const { payload, context } = req

  if (context?.preventRoleOverride) {
    return data
  }

  if (operation === 'create') {
    const { totalDocs: totalUsers } = await payload.count({
      collection: 'users',
      where: {
        role: {
          equals: 'super-admin',
        },
      },
    })

    if (totalUsers === 0) {
      return { ...data, role: ['super-admin'] }
    }
  }

  return data
}
