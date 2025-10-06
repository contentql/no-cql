import configPromise from '@payload-config'
import { Brand } from '@payload-types'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { brandsData, brandsImagesData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora) => {
  try {
    const brandImages: { id: string; name: string }[] = []
    const brandList: Brand[] = []

    // looping through images list uploading to media collection & pushing the result to brandImages array
    for await (const details of brandsImagesData) {
      const { alt, imageURL, name } = details

      try {
        const brandImage = await payload.create({
          collection: 'media',
          data: {
            alt,
          },
          filePath: imageURL,
        })

        brandImages.push({ id: brandImage.id, name })
      } catch (error) {
        spinner.fail(`Failed tp upload brand images...`)
        throw error
      }
    }
    spinner.succeed(`Completed uploading brand images...`)

    spinner.succeed(`Started creating brands...`)
    // lopping through authors creating authors with images and pushing the author details to usersList
    for await (const details of brandsData) {
      const imageId = brandImages.find(image => {
        return image.name === details.slug
      })

      try {
        const brand = await payload.create({
          collection: 'brands',
          data: {
            ...details,
            image: imageId?.id ?? '',
            name: details?.name,
            description: details?.description,
          },
          overrideAccess: true,
        })

        brandList.push(brand)
      } catch (error) {
        spinner.fail(`Failed creating brands...`)
        throw error
      }
    }

    spinner.succeed(`Successfully created brands...`)
    return brandList
  } catch (error) {
    spinner.fail(`Failed creating brands...`)
    throw error
  }
}

export default seed
