'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { User } from '@payload-types'
import { useMutation } from '@tanstack/react-query'
import { Camera, ImageUp } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { updateUserAction } from '@/actions/user'
import { updateUserSchema } from '@/actions/user/validator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { getInitials } from '@/utils/getInitials'
import { signOut } from '@/utils/signOut'
import uploadMedia from '@/utils/uploadMedia'

import DeleteAccountSection from './DeleteAccountSection'

const maxFileSize = 1024 * 1024 * 5

const ProfileForm = ({ user }: { user: User }) => {
  const [userImage, setUserImage] = useState<File>()
  const [userImageURL, setUserImageURL] = useState('')
  const [open, setOpen] = useState(false)

  const {
    execute,
    result,
    isPending: isUpdateUserPending,
  } = useAction(updateUserAction, {
    onSuccess: ({ data }) => {
      if (data) {
        toast.success('Successfully updated profile!')
      }
    },
  })

  const { imageUrl, username, displayName, role } = result?.data || user

  const form = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      displayName: displayName ?? '',
      password: '',
      confirmPassword: '',
    },
  })

  const { handleSubmit } = form

  const { mutate: uploadProfilePic, isPending: uploadingImage } = useMutation({
    mutationFn: uploadMedia,
    onSuccess: data => {
      execute({
        imageUrl: data.id,
      })
    },
  })

  const userDetails = {
    url:
      imageUrl && typeof imageUrl === 'object'
        ? {
            src: imageUrl.sizes?.thumbnail?.url!,
            alt: `${imageUrl?.alt}`,
          }
        : undefined,
    name: displayName || username,
    isAdmin: role.includes('admin'),
  }

  const initials = getInitials(userDetails.name!)

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    // throwing and error if file size exceeds
    if (file && file?.size > maxFileSize) {
      return toast.error('Maximum upload size is 5MB')
    }

    if (userImageURL) {
      URL.revokeObjectURL(userImageURL)
    }

    // this gives the preview of the image to the user
    if (file) {
      const url = URL.createObjectURL(file)
      setUserImage(file)
      setUserImageURL(url)
    } else {
      setUserImageURL('')
    }
  }

  const onSubmit = (data: z.infer<typeof updateUserSchema>) => {
    execute(data)
  }

  return (
    <div className='w-full max-w-4xl p-4'>
      <h2 className='text-3xl font-semibold'>Account Settings</h2>

      <div className='relative h-max w-max'>
        <Avatar className='my-8 size-40'>
          <AvatarImage src={userDetails.url?.src} />
          <AvatarFallback className='text-4xl'>{initials}</AvatarFallback>
        </Avatar>

        <Dialog
          open={open}
          onOpenChange={state => {
            if (!state) {
              URL.revokeObjectURL(userImageURL)
              setUserImage(undefined)
              setUserImageURL('')
            }

            setOpen(state)
          }}>
          <DialogTrigger asChild>
            <Button
              size='icon'
              onClick={() => setOpen(true)}
              className='absolute bottom-0 right-0 rounded-full border-2 border-background'>
              <Camera size={20} />
            </Button>
          </DialogTrigger>

          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Change your photo</DialogTitle>
              <DialogDescription>
                This will be shown on your profile
              </DialogDescription>
            </DialogHeader>
            <div className='grid grid-cols-[auto_1fr] gap-4 py-4'>
              <Avatar className='size-16'>
                <AvatarImage src={userImageURL || userDetails.url?.src || ''} />
                <AvatarFallback className='text-lg'>{initials}</AvatarFallback>
              </Avatar>

              <div className='flex w-full items-center justify-center'>
                <label
                  htmlFor='dropzone-file'
                  className='flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed text-muted-foreground transition-colors hover:bg-secondary/10'>
                  <div className='flex flex-col items-center justify-center pb-6 pt-5'>
                    <ImageUp />

                    <p className='mt-4 text-sm'>
                      <span className='font-semibold text-foreground'>
                        Click to upload
                      </span>
                    </p>
                    <p className='mt-2 text-center text-xs leading-5'>
                      Use square image for best results,
                      <br /> maximum upload size is 5MB
                    </p>
                  </div>

                  <input
                    accept='image/*'
                    multiple={false}
                    id='dropzone-file'
                    type='file'
                    className='hidden'
                    onChange={handleUpload}
                  />
                </label>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant='outline'
                onClick={() => {
                  setOpen(false)
                  URL.revokeObjectURL(userImageURL)
                  setUserImage(undefined)
                  setUserImageURL('')
                }}>
                Cancel
              </Button>
              <Button
                disabled={!userImage || uploadingImage || isUpdateUserPending}
                onClick={() => {
                  if (userImage) {
                    uploadProfilePic(userImage)
                  }
                }}>
                {uploadingImage || isUpdateUserPending
                  ? 'Saving changes...'
                  : 'Save changes'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='mb-8 space-y-8'>
          <FormField
            control={form.control}
            name={'displayName'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>

                <FormControl>
                  <Input {...field} placeholder='John Deo' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='mb-4 flex w-full flex-col items-center space-x-0 space-y-4 sm:mb-6 sm:flex-row sm:space-x-4 sm:space-y-0'>
            <div className='w-full space-y-1'>
              <FormLabel>Username</FormLabel>
              <Input
                type='text'
                id='username'
                name='username'
                placeholder='john-deo'
                value={user?.username!}
                disabled
              />
            </div>

            <div className='w-full space-y-1'>
              <FormLabel>Email</FormLabel>
              <Input
                type='text'
                id='email'
                name='email'
                placeholder='john.doe@example.com'
                value={user?.email}
                disabled
              />
            </div>
          </div>

          <div className='mb-4 flex w-full flex-col items-center space-x-0 space-y-4 sm:mb-6 sm:flex-row sm:space-x-4 sm:space-y-0'>
            <FormField
              control={form.control}
              name={'password'}
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Password</FormLabel>

                  <FormControl>
                    <Input {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={'confirmPassword'}
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Confirm Password</FormLabel>

                  <FormControl>
                    <Input {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type='submit' disabled={isUpdateUserPending}>
            {isUpdateUserPending ? 'Updating Profile' : 'Update Profile'}
          </Button>
        </form>
      </Form>

      <DeleteAccountSection user={user} />

      <Button
        className='my-8 block'
        variant='outline'
        onClick={() => signOut()}>
        Sign Out
      </Button>
    </div>
  )
}

export default ProfileForm
