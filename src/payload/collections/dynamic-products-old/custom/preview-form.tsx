'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useField } from '@payloadcms/ui'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

import { type FormConfig, type FormField as IFormField } from './types'

interface PreviewFormProps {
  config: FormConfig
  path: string
}

const widthClasses = {
  full: 'col-span-12',
  half: 'col-span-12 sm:col-span-6',
  third: 'col-span-12 sm:col-span-4',
} as const

export function PreviewForm({ config, path }: PreviewFormProps) {
  const { value, setValue } = useField({ path })

  const { fields, layout } = config

  const formSchema = z.object(
    fields.reduce<z.ZodRawShape>((acc, field) => {
      let validation = z.string()
      if (field.required) validation = validation.min(1, 'Required')
      if (field.validation?.min)
        validation = validation.min(field.validation.min)
      if (field.validation?.max)
        validation = validation.max(field.validation.max)
      if (field.validation?.pattern)
        validation = validation.regex(new RegExp(field.validation.pattern))
      return { ...acc, [field.name]: validation }
    }, {}),
  )

  type FormValues = z.infer<typeof formSchema>

  // Initialize form with existing values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: value || {},
  })

  // Watch for form changes and update the value
  useEffect(() => {
    const subscription = form.watch(formData => {
      setValue(formData)
    })

    return () => subscription.unsubscribe()
  }, [form, setValue])

  function onSubmit(values: FormValues) {
    setValue(values)
  }

  const renderField = (field: IFormField) => {
    const isInline = layout === 'inline'

    return (
      <div
        key={field.name}
        className={cn(isInline && widthClasses[field.width], 'px-2')}>
        <FormField
          control={form.control}
          name={field.name}
          render={({ field: formField }) => (
            <FormItem
              className={cn(
                'space-y-2',
                layout === 'horizontal' &&
                  'grid grid-cols-1 sm:grid-cols-3 sm:items-center sm:gap-4 sm:space-y-0',
              )}>
              <FormLabel
                className={cn(
                  'text-sm font-medium sm:text-base',
                  layout === 'horizontal' && 'sm:text-right',
                )}>
                {field.label}
              </FormLabel>
              <FormControl
                className={
                  layout === 'horizontal' ? 'sm:col-span-2' : undefined
                }>
                {(() => {
                  switch (field.type) {
                    case 'textarea':
                      return (
                        <Textarea
                          placeholder={field.placeholder}
                          {...formField}
                          className='min-h-[100px] resize-y rounded-none text-sm sm:text-base'
                        />
                      )
                    case 'select':
                      return (
                        <Select
                          onValueChange={val => {
                            formField.onChange(val)
                          }}
                          value={formField.value}>
                          <SelectTrigger className='h-10 rounded-none px-4 py-2 text-sm sm:text-base'>
                            <SelectValue placeholder={field.placeholder} />
                          </SelectTrigger>
                          <SelectContent className='rounded-none'>
                            {field.options?.map(opt => (
                              <SelectItem
                                key={opt.value}
                                value={opt.value}
                                className='rounded-none text-sm sm:text-base'>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )
                    case 'checkbox':
                      return (
                        <div className='flex items-center space-x-2'>
                          <Checkbox
                            className='h-5 w-5 rounded-none'
                            checked={
                              formField.value === 'true' ||
                              formField.value === true
                            }
                            onCheckedChange={checked => {
                              formField.onChange(checked)
                            }}
                          />
                          <span className='text-sm sm:text-base'>
                            {field.label}
                          </span>
                        </div>
                      )
                    case 'radio':
                      return (
                        <RadioGroup
                          onValueChange={val => {
                            formField.onChange(val)
                          }}
                          value={formField.value}
                          className='space-y-2'>
                          {field.options?.map(opt => (
                            <div
                              key={opt.value}
                              className='flex items-center space-x-2'>
                              <RadioGroupItem
                                className='h-5 w-5'
                                value={opt.value}
                              />
                              <span className='text-sm sm:text-base'>
                                {opt.label}
                              </span>
                            </div>
                          ))}
                        </RadioGroup>
                      )
                    default:
                      return (
                        <Input
                          type={field.type}
                          placeholder={field.placeholder}
                          {...formField}
                          value={formField.value ?? ''} // <-- force controlled
                          className='h-10 rounded-none px-4 py-2 text-sm sm:text-base'
                        />
                      )
                  }
                })()}
              </FormControl>
              <FormMessage
                className={cn(
                  'text-xs sm:text-sm',
                  layout === 'horizontal' && 'sm:col-span-2 sm:col-start-2',
                )}
              />
            </FormItem>
          )}
        />
      </div>
    )
  }

  return (
    <Form {...form}>
      <div onSubmitCapture={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div
          className={cn(
            '-mx-2 grid grid-cols-12 gap-4',
            layout !== 'inline' && 'grid-cols-1',
          )}>
          {fields.map(renderField)}
        </div>
      </div>
    </Form>
  )
}
