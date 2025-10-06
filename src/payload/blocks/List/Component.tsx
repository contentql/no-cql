import { Params } from '../types'
import configPromise from '@payload-config'
import { DetailsType } from '@payload-types'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import React from 'react'

import AuthorsList from './components/AuthorsList'
import BlogsList from './components/BlogsList'
import CategoriesList from './components/CategoriesList'
import TagsList from './components/TagsList'

interface ListProps extends DetailsType {
  params: Params
}

export const ListBlock: React.FC<ListProps> = async ({ params, ...block }) => {
  const payload = await getPayload({
    config: configPromise,
  })

  switch (block?.collectionSlug) {
    case 'blogs': {
      const { docs: blogs = [] } = await unstable_cache(
        async () =>
          await payload.find({
            collection: 'blogs',
            depth: 5,
            draft: false,
            limit: 1000,
          }),
        ['list', 'blogs'],
        { tags: ['list-blogs'] },
      )()

      return <BlogsList blogs={blogs} />
    }

    case 'tags': {
      const { docs: tags = [] } = await unstable_cache(
        async () =>
          await payload.find({
            collection: 'tags',
            depth: 5,
            draft: false,
            limit: 1000,
          }),
        ['list', 'tags'],
        { tags: ['list-tags'] },
      )()

      return <TagsList tags={tags} />
    }

    case 'users': {
      const { docs: authors = [] } = await unstable_cache(
        async () =>
          await payload.find({
            collection: 'users',
            where: {
              role: {
                equals: 'author',
              },
            },
            limit: 1000,
          }),
        ['list', 'authors'],
        { tags: ['list-authors'] },
      )()

      return <AuthorsList authors={authors} />
    }

    case 'categories': {
      const { docs: categories = [] } = await unstable_cache(
        async () =>
          await payload.find({
            collection: 'categories',
            depth: 5,
            draft: false,
            limit: 1000,
          }),
        ['list', 'categories'],
        { tags: ['list-categories'] },
      )()

      return <CategoriesList categories={categories} />
    }
  }
}
