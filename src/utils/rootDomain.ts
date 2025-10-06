import { env } from '@env'

export const rootDomain = env.NEXT_PUBLIC_WEBSITE_URL || 'localhost:3000'
