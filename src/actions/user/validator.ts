import { z } from 'zod'

export const updateUserSchema = z
  .object({
    displayName: z.string().optional(),
    password: z.union([z.string().min(6), z.literal('')]).optional(),
    confirmPassword: z.union([z.string().min(6), z.literal('')]).optional(),
    imageUrl: z.any().optional(),
  })
  .refine(
    data => {
      if (data?.password || data?.confirmPassword) {
        return data.password === data.confirmPassword
      }

      return true
    },
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    },
  )

export const deleteUserSchema = z.object({
  email: z.string().email({ message: 'Email is not valid' }),
})
