import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

export const revalidateSiteSettings: CollectionAfterChangeHook = async ({
  doc,
  req: { payload },
}) => {
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
  payload.logger.info(`Revalidating site-settings`)
  revalidateTag(`site-settings-${slug}`)
  return doc
}
