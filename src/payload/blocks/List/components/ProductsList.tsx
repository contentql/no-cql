'use client'

import JsonView from '../../common/JsonView'
import { Product } from '@payload-types'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

interface ProductsListProps {
  products: Product[]
}
const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  return (
    <div className='mx-auto max-h-screen min-h-screen max-w-7xl  gap-6 overflow-hidden px-2'>
      <div className='mt-4 flex items-center justify-between'>
        <code className='border-base-content/10 bg-base-content/20 rounded border-2 px-4 py-2'>
          Get Started by editing{' '}
          <strong>src/payload/blocks/List/Component.tsx</strong>
        </code>

        <Button asChild variant='outline'>
          <Link href={`/product/${products?.at(0)?.slug!}`}>
            View Product details
          </Link>
        </Button>
      </div>

      <JsonView data={products} />
    </div>
  )
}

export default ProductsList
