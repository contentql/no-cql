import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Ora } from 'ora'

import { blogsPageData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora) => {
  spinner.start(`Started created blogs-page...`)

  try {
    const result = await payload.create({
      collection: 'pages',
      data: blogsPageData,
    })

    spinner.succeed(`Successfully created blogs-page...`)
    return result
  } catch (error) {
    spinner.fail(`Failed to create blogs-page...`)
    throw error
  }
}

export default seed
