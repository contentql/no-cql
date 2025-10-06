import configPromise from '@payload-config'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { categoryDetailsPageData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async ({ spinner, id }: { spinner: Ora; id: any }) => {
  spinner.start(`Started creating category-details-page...`)

  try {
    const result = await payload.create({
      collection: 'pages',
      data: { ...categoryDetailsPageData, parent: id },
    })

    spinner.succeed(`Successfully created category-details-page`)

    return result
  } catch (error) {
    spinner.fail(`Failed creating category-details-page`)
    throw error
  }
}

export default seed
