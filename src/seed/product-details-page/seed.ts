import configPromise from '@payload-config'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { productDetailsPageData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async ({ spinner, id }: { spinner: Ora; id: any }) => {
  spinner.start(`Started creating product-details-page...`)

  try {
    const result = await payload.create({
      collection: 'pages',
      data: { ...productDetailsPageData, parent: id },
    })

    spinner.succeed(`Successfully created product-details-page`)

    return result
  } catch (error) {
    spinner.fail(`Failed creating product-details-page`)
    throw error
  }
}

export default seed
