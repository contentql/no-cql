'use client'

import { User } from '@payload-types'
import { TriangleAlert } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { deleteUserAction } from '@/actions/user'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

export default function DeleteAccountSection({ user }: { user: User }) {
  const [email, setEmail] = useState('')
  const router = useRouter()
  const { execute, isPending } = useAction(deleteUserAction, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.success('Account deleted successfully')
        router.push('/sign-up')
      }
    },
    onError: () => {
      toast.error('Unable to delete the account, try again!')
    },
  })

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='destructive'>
            <TriangleAlert size={16} />
            Delete Account
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? Deleting your
              account is permanent and will delete all your data forever.
            </DialogDescription>
          </DialogHeader>

          <p className='mt-6 text-sm leading-3 text-muted-foreground'>
            Type <strong>{user.email}</strong> to confirm
          </p>
          <Input type='text' onChange={e => setEmail(e.target.value)} />

          <DialogFooter>
            <Button
              disabled={email !== user.email || isPending}
              onClick={() => execute({ email })}
              variant='destructive'>
              {isPending ? 'Deleting' : 'Yes, Delete Account Forever'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
