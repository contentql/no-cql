import JsonView from '../../common/JsonView'
import { Tag } from '@payload-types'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

interface TagsListProps {
  tags: Tag[]
}
const TagsList: React.FC<TagsListProps> = ({ tags }) => {
  return (
    <div className='mx-auto max-h-screen min-h-screen max-w-7xl  gap-6 overflow-hidden px-2'>
      <div className='mt-4 flex items-center justify-between'>
        <code className='border-base-content/10 bg-base-content/20 rounded border-2 px-4 py-2'>
          Get Started by editing{' '}
          <strong>src/payload/blocks/List/Component.tsx</strong>
        </code>

        <Button asChild variant='outline'>
          <Link href={`/tag/${tags?.at(0)?.slug}`}>View tag details</Link>
        </Button>
      </div>

      <JsonView data={tags} />
    </div>
  )
}

export default TagsList
