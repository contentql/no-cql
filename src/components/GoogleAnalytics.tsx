'use client'

import { SiteSetting } from '@payload-types'
import Script from 'next/script'

const GoogleAnalytics = ({
  monetization,
}: {
  monetization: SiteSetting['monetization']
}) => {
  if (!monetization?.measurementId) return null // Render nothing if no measurement ID

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${monetization?.measurementId}`}
      />
      <Script id='google-analytics'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${monetization?.measurementId}');
        `}
      </Script>
    </>
  )
}

export default GoogleAnalytics
