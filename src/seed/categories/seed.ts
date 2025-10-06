import configPromise from '@payload-config'
import { Category } from '@payload-types'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { CategoriesData, CategoriesImagesData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora) => {
  try {
    const categoriesImages: { id: string; name: string }[] = []
    const categoryList: Category[] = []

    // looping through images list uploading to media collection & pushing the result to categoryImages array
    for await (const details of CategoriesImagesData) {
      const { alt, imageURL, name } = details

      try {
        const categoryImage = await payload.create({
          collection: 'media',
          data: {
            alt,
          },
          filePath: imageURL,
        })

        categoriesImages.push({ id: categoryImage.id, name })
      } catch (error) {
        spinner.fail(`Failed tp upload category images...`)
        throw error
      }
    }
    spinner.succeed(`Completed uploading category images...`)

    spinner.succeed(`Started creating categories...`)
    // lopping through authors creating authors with images and pushing the author details to usersList
    for await (const details of CategoriesData) {
      const imageId = categoriesImages.find(image => {
        return image.name === details.slug
      })

      try {
        const category = await payload.create({
          collection: 'categories',
          data: {
            ...details,
            image: imageId?.id ?? '',
            name: details?.name,
            description: details?.description,
            isFeatured: details?.isFeatured,
          },
          overrideAccess: true,
        })

        categoryList.push(category)
      } catch (error) {
        spinner.fail(`Failed creating categories...`)
        throw error
      }
    }

    spinner.succeed(`Successfully created categories...`)
    return categoryList
  } catch (error) {
    spinner.fail(`Failed creating categories...`)
    throw error
  }
}

export default seed
