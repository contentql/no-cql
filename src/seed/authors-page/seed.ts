import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Ora } from 'ora'

import { authorsPageData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora) => {
  spinner.start(`Started created authors-page...`)

  try {
    const result = await payload.create({
      collection: 'pages',
      data: authorsPageData,
    })

    spinner.succeed(`Successfully created authors-page...`)

    return result
  } catch (error) {
    spinner.fail(`Failed creating authors-page...`)

    throw error
  }
}

export default seed
