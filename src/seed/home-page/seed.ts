import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Ora } from 'ora'

import { homePageData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora) => {
  try {
    spinner.start(`Started created home-page...`)

    const result = await payload.create({
      collection: 'pages',
      data: homePageData,
    })

    spinner.succeed(`Successfully created home-page`)

    return result
  } catch (error) {
    spinner.succeed(`Failed to create home-page`)

    throw error
  }
}

export default seed
