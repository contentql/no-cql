'use client'

import { SiteSetting } from '@payload-types'

const GoogleAdsense = ({
  monetization,
}: {
  monetization: SiteSetting['monetization']
}) => {
  if (monetization?.adSenseId && process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${monetization?.adSenseId}`}
      crossOrigin='anonymous'
    />
  )
}

export default GoogleAdsense
