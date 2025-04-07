'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { resetPasswordAction } from '@/actions/auth'
import { resetPasswordSchema } from '@/actions/auth/validator'
import { Alert, AlertDescription } from '@/components/common/Alert'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const ResetPasswordForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const router = useRouter()
  const { execute, hasSucceeded, hasErrored, isPending } = useAction(
    resetPasswordAction,
    {
      onSuccess: ({ data: user }) => {
        if (user) {
          router.push('/sign-in')
        }
      },
    },
  )
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur',
    defaultValues: { token: token ?? '', password: '' },
  })

  const { handleSubmit } = form

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    execute(data)
  }

  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center'>
      <div>
        {hasSucceeded ? (
          <Alert variant='success' className='mb-12'>
            <AlertDescription>
              Successfully updated password, redirecting to sign-in page
            </AlertDescription>
          </Alert>
        ) : hasErrored ? (
          <Alert variant='danger' className='mb-12'>
            <AlertDescription>Failed to reset password</AlertDescription>
          </Alert>
        ) : null}
      </div>

      <div className='w-full max-w-md p-6'>
        <h1 className='text-3xl font-bold'>Enter new password</h1>

        <div className='mt-10'>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name={'password'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>

                    <FormControl>
                      <Input {...field} type='password' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full' disabled={isPending}>
                {isPending ? 'Processing...' : 'Reset Password'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordForm
