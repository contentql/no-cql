import React from 'react'

import { cn } from '@/lib/utils'

interface WidthProps {
  width: number
  children: React.ReactNode
}

function getWidth(width: number) {
  if (width <= 25) return 'w-1/4'
  else if (width > 25 && width < 50) return 'w-[calc(25%-16px)]'
  else if (width >= 50 && width < 75) return 'w-[calc(50%-16px)]'
  else if (width >= 75 && width < 100) return 'w-[calc(75%-16px)]'
  else return 'w-full'
}
const Width: React.FC<WidthProps> = ({ children, width }) => {
  return <div className={cn(getWidth(width))}>{children}</div>
}

export default Width
