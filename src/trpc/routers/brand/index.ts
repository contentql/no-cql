import configPromise from '@payload-config'
import { TRPCError } from '@trpc/server'
import { getPayload } from 'payload'
import { z } from 'zod'

import { publicProcedure, router } from '@/trpc'

const payload = await getPayload({
  config: configPromise,
})

export const brandRouter = router({
  getAllBrands: publicProcedure.query(async () => {
    try {
      const { docs } = await payload.find({
        collection: 'brands',
        depth: 5,
        draft: false,
      })

      return docs
    } catch (error: any) {
      console.log(error)
      throw new Error(error.message)
    }
  }),

  getBrandBySlug: publicProcedure
    .input(
      z.object({
        slug: z.any(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const { docs } = await payload.find({
          collection: 'brands',
          draft: false,
          where: {
            slug: {
              equals: input.slug,
            },
          },
        })

        const brand = docs.at(0)

        if (!brand) {
          throw new TRPCError({ message: 'No brand found!', code: 'NOT_FOUND' })
        }

        return brand
      } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
      }
    }),

  getBrandsCount: publicProcedure.query(async () => {
    try {
      const { totalDocs } = await payload.count({
        collection: 'brands',
      })

      return totalDocs
    } catch (error: any) {
      console.log(error)
      throw new Error(error.message)
    }
  }),
})
