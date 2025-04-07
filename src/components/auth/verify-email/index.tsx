'use client'

import { Loader } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { verifyEmailAction } from '@/actions/auth'

const EmailVerificationView = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const userId = searchParams.get('id')
  const { execute, isPending, hasErrored } = useAction(verifyEmailAction, {
    onSuccess: ({ data: emailVerified }) => {
      if (emailVerified) {
        toast.success(`Your email successfully verified`)
        router.push('/sign-in')
      }
    },
  })

  useEffect(() => {
    if (!token || !userId) {
      router.push('/sign-in')
    } else {
      execute({ token, userId })
    }
  }, [execute, router, token, userId])

  return (
    <div className='flex min-h-screen items-center justify-center gap-x-2'>
      {isPending ? (
        <p>
          <Loader size={20} className='mr-3 inline-block animate-spin' />
          Please wait! email verification in progress...
        </p>
      ) : null}

      {hasErrored ? (
        <p>
          Failed to verify email, the link might be expired. Please request new
          link or contact support for help
        </p>
      ) : null}
    </div>
  )
}

export default EmailVerificationView
