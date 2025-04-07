import JsonView from '../../common/JsonView'
import { Blog } from '@payload-types'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

interface BlogDetailsProps {
  blog: Blog
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ blog }) => {
  return (
    <div className='mx-auto max-h-screen min-h-screen max-w-7xl  gap-6 overflow-hidden px-2'>
      <div className='mt-4 flex items-center justify-between'>
        <code className='border-base-content/10 bg-base-content/20 rounded border-2 px-4 py-2'>
          Get Started by editing{' '}
          <strong>src/payload/blocks/Details/Component.tsx</strong>
        </code>

        <Button variant='outline'>
          <Link href='/blogs'>Go back</Link>
        </Button>
      </div>

      <JsonView data={blog} />
    </div>
  )
}

export default BlogDetails
