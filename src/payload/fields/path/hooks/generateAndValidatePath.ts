import { generateBreadcrumbsUrl } from '../../../../utils/generateBreadcrumbsUrl'
import { willPathConflict } from '../utils/willPathConflict'
import { getParents } from '@payloadcms/plugin-nested-docs'
import { APIError, type FieldHook } from 'payload'

export const generateAndValidatePath: FieldHook = async ({
  collection,
  req,
  value,
  siblingData,
  originalDoc,
  operation,
}) => {
  // This can happen if auto save is on.
  if (
    operation === 'create' &&
    value == null &&
    (Object.keys(originalDoc).length === 0 ||
      Object.keys(siblingData).length === 0)
  )
    return value

  const { payload, user } = req

  if (!payload) return value // If not server side exist

  const currentDoc = { ...originalDoc, ...siblingData }

  if (siblingData?.pathMode && siblingData?.pathMode === 'custom') {
    return value
  }

  if (!collection) {
    throw new APIError('Collection configuration is missing.', 500)
  }

  const docs = await getParents(
    req,
    // @ts-ignore
    { parentFieldSlug: 'parent' },
    collection,
    currentDoc,
    [currentDoc],
  )

  const updatedPath = generateBreadcrumbsUrl(docs, currentDoc)
  const isNewPathConflicting = await willPathConflict({
    payload,
    path: updatedPath,
    currentDocId: currentDoc.id,
    currentCollection: collection ? collection.slug : 'pages',
    collectionsToCheck: ['pages'], // Add more collections as needed
    tenantId: user?.tenants?.at(0)?.id || undefined,
  })

  if (isNewPathConflicting) {
    const error = new APIError(
      updatedPath === '/'
        ? 'A home page already exists.'
        : 'This will create a conflict with an existing path.',
      400,
      [
        {
          field: 'path',
          message: 'This will conflict with an existing path.',
        },
      ],
      false,
    )
    throw error
  }

  return updatedPath
}
