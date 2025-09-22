import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod'

import { publicProcedure, router } from '@/trpc'

const payload = await getPayload({
  config: configPromise,
})

export const siteSettingsRouter = router({
  getSiteSettings: publicProcedure
    .input(z.object({ organization: z.string() }))
    .query(async ({ input }) => {
      const { organization } = input
      try {
        const data = await payload.find({
          collection: 'SiteSettings',
          draft: false,
          limit: 1,
          where: {
            'tenant.slug': { equals: organization },
          },
        })

        return data.docs.at(0)
      } catch (error: any) {
        console.log({ error })
        throw new Error(error.message)
      }
    }),
})
