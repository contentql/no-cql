import configPromise from '@payload-config'
import { Tag, User } from '@payload-types'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { blogListData, styleGuideBlogData } from './data'

const payload = await getPayload({ config: configPromise })

const createStyleGuideBlog = async ({
  tags,
  authors,
}: {
  tags: Tag[]
  authors: User[]
}) => {
  const {
    alt,
    authorsList,
    content,
    contentAlt,
    contentURL,
    description,
    posterURL,
    slug,
    tagsList,
    title,
  } = styleGuideBlogData

  const posterImage = await payload.create({
    collection: 'media',
    data: {
      alt,
    },
    filePath: posterURL,
  })

  const contentImage = await payload.create({
    collection: 'media',
    data: {
      alt: contentAlt,
    },
    filePath: contentURL,
  })

  const styleGuideContent = content(String(contentImage.id))

  const styleGuideAuthors = authorsList
    .map(authorSlug => {
      const sameAuthor = authors.find(author => author.username === authorSlug)

      if (sameAuthor) {
        return {
          relationTo: 'users',
          value: sameAuthor.id,
        }
      }
    })
    .filter(
      (author): author is { relationTo: 'users'; value: number } => !!author,
    )

  const styleGuideTags = tagsList
    .map(tagSlug => {
      const sameTag = tags.find(tag => tag.slug === tagSlug)

      if (sameTag) {
        return {
          relationTo: 'tags',
          value: sameTag.id,
        }
      }
    })
    .filter((tag): tag is { relationTo: 'tags'; value: number } => !!tag)

  await payload.create({
    collection: 'blogs',
    data: {
      blogImage: posterImage.id,
      content: styleGuideContent,
      description,
      slug,
      title,
      author: styleGuideAuthors,
      tags: styleGuideTags,
      _status: 'published',
      meta: {
        title,
        description,
        image: posterImage.id,
      },
    },
  })
}

const seed = async ({
  spinner,
  tags,
  authors,
}: {
  spinner: Ora
  tags: Tag[]
  authors: User[]
}) => {
  try {
    // creating blogs which don't have any images in middle
    for await (const blog of blogListData) {
      const {
        alt,
        imageURL,
        authorsList,
        content,
        description,
        slug,
        title,
        tagsList,
      } = blog

      const image = await payload.create({
        collection: 'media',
        data: {
          alt,
        },
        filePath: imageURL,
      })

      const filteredAuthors = authorsList
        .map(authorSlug => {
          const sameAuthor = authors.find(
            author => author.username === authorSlug,
          )

          if (sameAuthor) {
            return {
              relationTo: 'users',
              value: sameAuthor.id,
            }
          }
        })
        .filter(
          (author): author is { relationTo: 'users'; value: number } =>
            !!author,
        )

      const filteredTags = tagsList
        .map(tagSlug => {
          const sameTag = tags.find(tag => tag.slug === tagSlug)

          if (sameTag) {
            return {
              relationTo: 'tags',
              value: sameTag.id,
            }
          }
        })
        .filter((tag): tag is { relationTo: 'tags'; value: number } => !!tag)

      await payload.create({
        collection: 'blogs',
        data: {
          blogImage: image.id,
          content,
          description,
          slug,
          title,
          author: filteredAuthors,
          tags: filteredTags,
          _status: 'published',
          meta: {
            description,
            title,
            image: image.id,
          },
        },
      })
    }

    await createStyleGuideBlog({ authors, tags })

    spinner.succeed(`Successfully created blogs...`)
  } catch (error) {
    spinner.fail(`Failed creating blogs...`)

    throw error
  }
}

export default seed
