'use server'

import configPromise from '@payload-config'
import { cookies } from 'next/headers'
import { getPayload } from 'payload'

import { protectedClient } from '@/lib/safe-action'

import { deleteUserSchema, updateUserSchema } from './validator'

const payload = await getPayload({
  config: configPromise,
})

// Using protectedClient for server-side validation
export const updateUserAction = protectedClient
  .metadata({
    actionName: 'updateUserAction',
  })
  .schema(updateUserSchema)
  .action(async ({ clientInput, ctx }) => {
    const { confirmPassword = '', ...data } = clientInput

    const response = await payload.update({
      collection: 'users',
      id: ctx.user.id,
      data,
    })

    return response
  })

export const deleteUserAction = protectedClient
  .metadata({
    actionName: 'deleteUserAction',
  })
  .schema(deleteUserSchema)
  .action(async ({ clientInput, ctx }) => {
    const { email } = clientInput

    if (email !== ctx.user.email) {
      throw new Error("You're not allowed to perform this action!")
    }

    await payload.delete({
      collection: 'users',
      id: ctx.user.id,
    })

    const cookieStore = await cookies()
    cookieStore.delete('payload-token')

    return { success: true }
  })
