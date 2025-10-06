import configPromise from '@payload-config'
import { TRPCError } from '@trpc/server'
import { getPayload } from 'payload'
import { z } from 'zod'

import { publicProcedure, router } from '@/trpc'

const payload = await getPayload({
  config: configPromise,
})

export const categoryRouter = router({
  getAllCategories: publicProcedure.query(async () => {
    try {
      const { docs } = await payload.find({
        collection: 'categories',
        depth: 5,
        draft: false,
      })

      return docs
    } catch (error: any) {
      console.log(error)
      throw new Error(error.message)
    }
  }),

  getCategoryBySlug: publicProcedure
    .input(
      z.object({
        slug: z.any(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const { docs } = await payload.find({
          collection: 'categories',
          draft: false,
          where: {
            slug: {
              equals: input.slug,
            },
          },
        })

        const category = docs.at(0)

        if (!category) {
          throw new TRPCError({
            message: 'No category found!',
            code: 'NOT_FOUND',
          })
        }

        return category
      } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
      }
    }),

  getCategoriesCount: publicProcedure.query(async () => {
    try {
      const { totalDocs } = await payload.count({
        collection: 'categories',
      })

      return totalDocs
    } catch (error: any) {
      console.log(error)
      throw new Error(error.message)
    }
  }),
})
