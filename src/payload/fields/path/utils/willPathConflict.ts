import type { Payload } from 'payload'

export const willPathConflict = async ({
  payload,
  path,
  currentDocId,
  currentCollection,
  collectionsToCheck = [],
  tenantId,
}: {
  payload: Payload
  path: string
  currentDocId?: string
  currentCollection: string
  collectionsToCheck?: string[]
  tenantId?: string
}) => {
  if (!payload || collectionsToCheck.length === 0) return false

  const queries = collectionsToCheck.map(collection => {
    const whereCondition: any = {
      and: [
        {
          path: {
            equals: path,
          },
        },
        {
          tenant: {
            equals: tenantId,
          },
        },
      ],
    }
    if (currentDocId && currentCollection === collection) {
      whereCondition.id = { not_equals: currentDocId }
    }

    return payload.find({
      // @ts-ignore
      collection,
      where: whereCondition,
      limit: 1,
    })
  })

  const results = await Promise.allSettled(queries)
  return results.some(
    result => result.status === 'fulfilled' && result.value.docs.length > 0,
  )
}
