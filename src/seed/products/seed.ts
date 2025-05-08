import configPromise from '@payload-config'
import { Product } from '@payload-types'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { productsData, productsImagesData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora) => {
  try {
    const productImages: { id: string; name: string }[] = []
    const productList: Product[] = []

    // Fetch all required reference data
    const { docs: brandsData } = await payload.find({ collection: 'brands' })
    const { docs: categoriesData } = await payload.find({
      collection: 'categories',
    })

    // Upload images
    for await (const details of productsImagesData) {
      const { alt, imageURL, name } = details

      try {
        const productImage = await payload.create({
          collection: 'media',
          data: { alt },
          filePath: imageURL,
        })

        productImages.push({ id: productImage.id, name })
      } catch (error) {
        spinner.fail(`Failed to upload product images...`)
        throw error
      }
    }

    spinner.succeed(`Completed uploading product images...`)
    spinner.start(`Creating products...`)

    for await (const product of productsData) {
      const matchedImages = productImages
        .filter(image => image.name === product.slug)
        .map(image => image.id)

      // Match or fallback to first brand
      const brandID =
        brandsData.find(b => b.name.toLowerCase().includes('samsung'))?.id ??
        brandsData.at(0)?.id ??
        ''

      // Match or fallback to first category
      const categoryID =
        categoriesData.find(c => c.name.toLowerCase().includes('mobile-phones'))
          ?.id ??
        categoriesData.at(0)?.id ??
        ''

      try {
        const created = await payload.create({
          collection: 'products',
          data: {
            ...product,
            name: product.name,
            description: product.description,
            brand: brandID,
            category: categoryID,
            images: matchedImages,
          },
          overrideAccess: true,
        })

        productList.push(created)
      } catch (error) {
        spinner.fail(`Failed creating product: ${product.name}`)
        throw error
      }
    }

    spinner.succeed(`Successfully created products...`)
    return productList
  } catch (error) {
    spinner.fail(`Failed creating products...`)
    throw error
  }
}

export default seed
