import { DetailsType, Page } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

export const revalidatePages: CollectionAfterChangeHook<Page> = async ({
  doc,
  req: { payload },
}) => {
  // checking for dynamic blocks present in page or not
  const dynamicBlock = doc?.layout?.find(
    block => block.blockType === 'DetailsBlock' && block.collectionSlug,
  ) as DetailsType | undefined

  let tenantId
  if (typeof doc.tenant === 'string') {
    tenantId = doc.tenant
  } else if (typeof doc.tenant === 'object' && doc.tenant?.id) {
    tenantId = doc.tenant.id
  }
  const { slug } = await payload.findByID({
    collection: 'tenants',
    id: tenantId!,
  })
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published' && !dynamicBlock) {
    revalidateTag(`page-${slug}-${doc?.path}`)
    console.log(
      `revalidated page-${slug}-${doc?.path} at ${new Date().getTime()}`,
    )
  }
  // else fetching the records of that dynamic-block
  else if (dynamicBlock) {
    const { collectionSlug } = dynamicBlock

    if (collectionSlug) {
      const { docs } = await payload.find({
        collection: collectionSlug,
        limit: 1000,
        select: {
          username: true,
          slug: true,
        },
      })

      if (docs.length > 0) {
        let basePath = doc?.path

        docs.forEach(doc => {
          let modifiedPath = basePath

          // replacing the [details] path with slug or username
          if ('username' in doc) {
            if (modifiedPath) {
              modifiedPath = modifiedPath.replace(/\[(.*?)\]/, doc.username)
            }
          } else {
            if (modifiedPath && doc.slug) {
              modifiedPath = modifiedPath.replace(/\[(.*?)\]/, doc.slug)
            }
          }

          if (modifiedPath) {
            revalidateTag(`page-${slug}-${modifiedPath}`)
            console.log(
              `revalidated page-${slug}-${modifiedPath} at ${new Date().getTime()}`,
            )
          }
        })
      }
    }
  }
}

export const revalidatePagesAfterDelete: CollectionAfterDeleteHook<
  Page
> = async ({ doc, req: { payload } }) => {
  // checking for dynamic blocks present in page or not
  const dynamicBlock = doc?.layout?.find(
    block => block.blockType === 'DetailsBlock' && block.collectionSlug,
  ) as DetailsType | undefined

  let tenantId
  if (typeof doc.tenant === 'string') {
    tenantId = doc.tenant
  } else if (typeof doc.tenant === 'object' && doc.tenant?.id) {
    tenantId = doc.tenant.id
  }
  const { slug } = await payload.findByID({
    collection: 'tenants',
    id: tenantId!,
  })

  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published' && !dynamicBlock) {
    revalidateTag(`page-${slug}-${doc?.path}`)
    console.log(
      `revalidated page-${slug}-${doc?.path} at ${new Date().getTime()}`,
    )
  }
  // else fetching the records of that dynamic-block
  else if (dynamicBlock) {
    const { collectionSlug } = dynamicBlock

    if (collectionSlug) {
      const { docs } = await payload.find({
        collection: collectionSlug,
        limit: 1000,
        select: {
          username: true,
          slug: true,
        },
      })

      if (docs.length > 0) {
        let basePath = doc?.path

        docs.forEach(doc => {
          let modifiedPath = basePath

          // replacing the [details] path with slug or username
          if ('username' in doc) {
            if (modifiedPath) {
              modifiedPath = modifiedPath.replace(/\[(.*?)\]/, doc.username)
            }
          } else {
            if (modifiedPath && doc.slug) {
              modifiedPath = modifiedPath.replace(/\[(.*?)\]/, doc.slug)
            }
          }

          if (modifiedPath) {
            revalidateTag(`page-${slug}-${modifiedPath}`)
            console.log(
              `revalidated page-${slug}-${modifiedPath} at ${new Date().getTime()}`,
            )
          }
        })
      }
    }
  }
}
