'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormSubmission, Form as FormType } from '@payload-types'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form as FormComponent } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import uploadMedia from '@/utils/uploadMedia'

import { fieldsJsx } from './Fields'
import Width from './Width'

export interface Data {
  [key: string]: string | File[]
}

const Form = ({
  form,
  className = '',
}: {
  form: FormType
  className?: string
}) => {
  const router = useRouter()

  const {
    fields,
    confirmationType,
    redirect,
    confirmationMessage,
    submitButtonLabel,
    id,
  } = form

  // Building form initial values based on field type
  const buildInitialFormState = () => {
    return fields?.reduce(
      (acc, field) => {
        if ('name' in field && field.name) {
          // Handle fields that have a 'name' property
          switch (field.blockType) {
            case 'checkbox':
              acc[field.name] = field?.defaultValue || false
              break
            case 'number':
              acc[field.name] = field.defaultValue || ''
              break
            case 'text':
            case 'textarea':
              acc[field?.name] = field.defaultValue || ''
              break
            case 'select':
            case 'country':
              acc[field.name] = ''
              break
            case 'email':
              acc[field.name] = ''
              break
            case 'upload':
              acc[field.name] = null
              break
            default:
              acc[field] = ''
              break
          }
        } else if (field.blockType === 'message') {
          acc['message'] = field.message || ''
        }
        return acc
      },
      {} as Record<string, any>,
    )
  }

  // Building a zod-schema based on field type
  const formSchema = () => {
    const fieldsSchema = fields
      ? fields?.reduce(
          (acc, field) => {
            if (!field || typeof field !== 'object') return acc

            // Define Zod validation schema per field type
            switch (field.blockType) {
              case 'checkbox':
                acc[field.name] = field.required
                  ? z.boolean({
                      message: `${field.label} is required`,
                    })
                  : z.boolean().optional()
                break
              case 'number':
                acc[field.name] = field.required
                  ? z.string({
                      message: `${field.label} is required`,
                    })
                  : z.string().optional()
                break
              case 'text':
              case 'textarea':
                acc[field.name] = field.required
                  ? z.string().min(1, `${field.label} is required`)
                  : z.string().optional()
                break
              case 'select':
              case 'country':
                acc[field.name] = field.required
                  ? z.string().min(1, `${field.label} is required`)
                  : z.string().optional()
                break
              case 'email':
                acc[field.name] = field.required
                  ? z.string().email(`${field.label} must be a valid email`)
                  : z.string().optional()
                break
              case 'upload':
                acc[field.name] = field.required
                  ? z.array(
                      z.instanceof(File, {
                        message: `${field.label} is required`,
                      }),
                    )
                  : z.array(z.instanceof(File)).optional()
                break
              default:
                acc['default'] = z.string().optional() // Default case for unknown field types
                break
            }

            return acc
          },
          {} as Record<string, any>,
        )
      : {}

    return z.object(fieldsSchema)
  }

  const formMethod = useForm({
    defaultValues: buildInitialFormState(),
    resolver: zodResolver(formSchema()),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
    getValues,
  } = formMethod

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: Data) => {
      const url = typeof window !== 'undefined' ? window.location.origin : ''

      try {
        // Creating form-submission payload, if form has images uploading them to media collection and adding them to file field
        const formattedData = await Promise.all(
          Object.entries(data).map(async ([name, value]) => {
            if (typeof value !== 'object') {
              return { field: name, value }
            }

            const imageID: any[] = []

            for await (const file of value) {
              const imageResponse = await uploadMedia(file)
              imageID.push(imageResponse.id)
            }

            return {
              field: name,
              value: '',
              file: imageID,
            }
          }),
        )

        const response = await fetch(`${url}/api/form-submissions`, {
          method: 'POST',
          body: JSON.stringify({
            form: id,
            submissionData: formattedData,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const formattedResponse = (await response.json()) as FormSubmission

        return formattedResponse
      } catch (error) {
        throw new Error('Failed to submit form, please try again!')
      }
    },
    onSuccess: () => {
      if (confirmationType === 'redirect' && redirect) {
        const { url } = redirect
        const redirectUrl = url
        if (redirectUrl) router.push(redirectUrl)
      } else if (confirmationType === 'message' && confirmationMessage)
        toast.success('🎉 Successfully submitted Form', { id: 'form-submit' })
      reset()
    },
  })

  const onsubmit = async (data: Data) => {
    mutate(data)
  }

  return (
    <FormComponent {...formMethod}>
      <form
        onSubmit={handleSubmit(onsubmit)}
        className={cn('space-y-8', className)}>
        <div className='flex w-full flex-wrap gap-4 sm:gap-6'>
          {fields
            ? fields?.map((field, index) => {
                const Field: React.FC<any> = fieldsJsx[field?.blockType]

                if (Field) {
                  return (
                    <Width
                      key={index}
                      width={'width' in field ? field.width! : 100}>
                      <Field
                        form={form}
                        {...field}
                        {...formMethod}
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        control={control}
                        getValues={getValues}
                      />
                    </Width>
                  )
                }
              })
            : null}
        </div>

        <Button type='submit' disabled={isPending}>
          {submitButtonLabel ? submitButtonLabel : 'Submit'}
        </Button>
      </form>
    </FormComponent>
  )
}

export default Form
