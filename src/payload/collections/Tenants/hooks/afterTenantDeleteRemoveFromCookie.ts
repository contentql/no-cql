import { Tenant } from '@payload-types'
import { CollectionAfterDeleteHook } from 'payload'

export const afterTenantDeleteRemoveFromCookie: CollectionAfterDeleteHook<
  Tenant
> = async () => {}
