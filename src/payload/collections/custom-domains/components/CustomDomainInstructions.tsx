// components/CustomDomainInstructions.tsx
'use client'

import React from 'react'

// components/CustomDomainInstructions.tsx

// components/CustomDomainInstructions.tsx

// components/CustomDomainInstructions.tsx

const CustomDomainInstructions: React.FC = () => {
  return (
    <div className='rounded border bg-blue-50 p-4 text-sm leading-relaxed'>
      <h3 className='mb-2 font-semibold'>
        Follow these instructions to attach a custom domain:
      </h3>

      <div className='mb-4'>
        <p className='font-medium'>
          Subdomain (e.g., <code>user1.work.com</code>):
        </p>
        <ol className='ml-2 list-inside list-decimal'>
          <li>Add this DNS record in your domain provider</li>
        </ol>
        <pre className='mt-2 rounded border bg-white p-2 text-xs'>
          {`type: CNAME
name: user1
content: charan.deepflow.sh
proxy: false`}
        </pre>
      </div>

      <div>
        <p className='font-medium'>
          Domain (e.g., <code>work.com</code>):
        </p>
        <ol className='ml-2 list-inside list-decimal'>
          <li>Add this DNS record in your domain provider</li>
        </ol>
        <pre className='mt-2 rounded border bg-white p-2 text-xs'>
          {`type: CNAME
name: @
content: charan.deepflow.sh
proxy: false`}
        </pre>
      </div>
    </div>
  )
}

export default CustomDomainInstructions
