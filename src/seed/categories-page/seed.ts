import configPromise from '@payload-config'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { categoriesPageData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora) => {
  try {
    spinner.start(`Started creating categories-page...`)

    const result = await payload.create({
      collection: 'pages',
      data: categoriesPageData,
    })

    spinner.succeed(`Successfully created categories-page`)
    return result
  } catch (error) {
    spinner.fail(`Failed to create categories-page`)
    throw error
  }
}

export default seed
