'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { httpBatchLink } from '@trpc/client'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { ThemeProvider } from 'next-themes'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import React, { useState } from 'react'

import { trpc } from '@/trpc/client'

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}))
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `/api/trpc`,
        }),
      ],
    }),
  )

  return (
    <ThemeProvider enableSystem attribute='class' enableColorScheme={false}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <ProgressBar
            height='2px'
            color='hsl(var(--primary))'
            options={{ showSpinner: false }}
            shallowRouting
          />
          <NuqsAdapter>{children}</NuqsAdapter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </trpc.Provider>
    </ThemeProvider>
  )
}
