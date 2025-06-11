'use client'

import { useField } from '@payloadcms/ui'
import { useEffect, useState } from 'react'

import { getProductTemplateById } from './actions/productTemplateRoute'
import { PreviewForm } from './preview-form'
import './preview-form.css'
import { FormConfig } from './types'

const RenderFields = ({ path }: { path: string }) => {
  const { value: productTemplate, setValue: setProductTemplate } = useField<
    string | undefined | null
  >({
    path: 'productTemplate',
  })
  const [fields, setFields] = useState<FormConfig['fields'] | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        if (!productTemplate) return null

        const templateData = await getProductTemplateById(productTemplate)

        if (!templateData?.fields?.length) {
          setFields(null)
          return
        }

        const formatted = templateData.fields.map((field: any) => {
          const baseField = {
            name: field.name.replace(/\s+/g, '_').toLowerCase(),
            type: field.blockType as
              | 'number'
              | 'text'
              | 'email'
              | 'textarea'
              | 'select'
              | 'checkbox'
              | 'radio',
            label: field.label,
            width: 'full' as const,
            required: field.required,
          }

          if (field.blockType === 'select' || field.blockType === 'radio') {
            return {
              ...baseField,
              options: Array.isArray(field.options)
                ? field.options.map((option: any) => ({
                    value: option.value,
                    label: option.label,
                  }))
                : undefined,
            }
          }

          return baseField
        })

        setFields(formatted)
      } catch (error) {
        console.error('Failed to fetch product template:', error)
        setFields(null)
      }
    }

    fetchData()
  }, [productTemplate])

  if (!productTemplate) {
    return <div>Invalid product template</div>
  }

  if (!fields) return null

  return (
    <div className='preview-form'>
      <PreviewForm
        config={{ layout: 'inline', fields: fields || [] }}
        path={path}
      />
    </div>
  )
}

export default RenderFields
