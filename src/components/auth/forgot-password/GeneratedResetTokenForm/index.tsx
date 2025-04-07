'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { forgotPasswordAction } from '@/actions/auth'
import { forgotPasswordSchema } from '@/actions/auth/validator'
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

const GenerateResetTokenForm: React.FC = () => {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
    defaultValues: { email: '' },
  })

  const { handleSubmit, reset } = form

  const { execute, hasSucceeded, hasErrored, isPending } = useAction(
    forgotPasswordAction,
    {
      onSuccess: ({ data }) => {
        if (data) {
          reset()
        }
      },
    },
  )

  const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    execute(data)
  }

  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center'>
      <div>
        {hasSucceeded ? (
          <Alert variant='success' className='mb-12'>
            <AlertDescription>
              Reset email has been sent to your email.
            </AlertDescription>
          </Alert>
        ) : hasErrored ? (
          <Alert variant='danger' className='mb-12'>
            <AlertDescription>Failed to sent reset email.</AlertDescription>
          </Alert>
        ) : null}
      </div>

      <div className='w-full max-w-md p-6'>
        <h1 className='text-3xl font-bold'>Forgot password?</h1>

        <div className='mt-8'>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='space-y-8'>
                <FormField
                  control={form.control}
                  name={'email'}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>

                      <FormControl>
                        <Input
                          {...field}
                          type='email'
                          placeholder='johndeo@gmail.com'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type='submit' className='w-full' disabled={isPending}>
                  {isPending ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default GenerateResetTokenForm
