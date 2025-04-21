import { router } from '@/trpc'
import { authorRouter } from '@/trpc/routers/author'
import { blogRouter } from '@/trpc/routers/blog'
import { pageRouter } from '@/trpc/routers/page'
import { siteSettingsRouter } from '@/trpc/routers/site-settings'
import { tagRouter } from '@/trpc/routers/tag'

import { brandRouter } from './brand'
import { categoryRouter } from './category'
import { formRouter } from './form'
import { productRouter } from './product'
import { searchRouter } from './search'
import { seedRouter } from './seed'

export const appRouter = router({
  page: pageRouter,
  blog: blogRouter,
  siteSettings: siteSettingsRouter,
  tag: tagRouter,
  author: authorRouter,
  seed: seedRouter,
  search: searchRouter,
  form: formRouter,
  brand: brandRouter,
  category: categoryRouter,
  product: productRouter,
})

export type AppRouter = typeof appRouter
