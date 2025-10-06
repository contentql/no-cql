'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

const payload = await getPayload({ config: configPromise })

export const getProductTemplateById = async (id: string) => {
  try {
    const result = await payload.findByID({
      collection: 'product-templates' as any, // Suppress TS temporarily
      id,
    })
    return result
  } catch (err) {
    console.warn('Collection not found or removed:', err)
    return null
  }
}
