'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

const payload = await getPayload({ config: configPromise })

export const getProductTemplateById = async (id: string) => {
  const result = await payload.findByID({
    collection: 'product-templates',
    id,
  })

  return result
}
