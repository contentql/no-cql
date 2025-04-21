import configPromise from '@payload-config'
import { TRPCError } from '@trpc/server'
import { getPayload } from 'payload'
import { z } from 'zod'

import { publicProcedure, router } from '@/trpc'

const payload = await getPayload({
  config: configPromise,
})

export const productRouter = router({
  getAllProducts: publicProcedure.query(async () => {
    try {
      const { docs } = await payload.find({
        collection: 'products',
        depth: 5,
        draft: false,
      })

      return docs
    } catch (error: any) {
      console.log(error)
      throw new Error(error.message)
    }
  }),

  getProductBySlug: publicProcedure
    .input(
      z.object({
        slug: z.any(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const { docs } = await payload.find({
          collection: 'products',
          draft: false,
          where: {
            slug: {
              equals: input.slug,
            },
          },
        })

        const product = docs.at(0)

        if (!product) {
          throw new TRPCError({
            message: 'No product found!',
            code: 'NOT_FOUND',
          })
        }

        return product
      } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
      }
    }),

  getProductsCount: publicProcedure.query(async () => {
    try {
      const { totalDocs } = await payload.count({
        collection: 'products',
      })

      return totalDocs
    } catch (error: any) {
      console.log(error)
      throw new Error(error.message)
    }
  }),
})
