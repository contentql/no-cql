import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function page() {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'categories',
    where: {
      parent: {
        exists: false,
      },
    },
  })

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
