import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function page() {
  const payload = await getPayload({
    config: configPromise,
  })

  const categories = await payload.find({
    collection: 'categories',
    depth: 1,
    where: {
      parent: {
        exists: false,
      },
    },
  })

  const products = await payload.find({
    collection: 'products',
    depth:1,
  })
  
  return (
    <div>
      <h1>Categories :</h1>
      <pre>{JSON.stringify(categories, null, 2)}</pre>
      <h1>Products :</h1>
      <pre>{JSON.stringify(products,null,2)}</pre>
    </div>
  )
}
