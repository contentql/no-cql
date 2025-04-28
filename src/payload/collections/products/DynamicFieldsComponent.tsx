import { useField } from '@payloadcms/ui'
import { useEffect, useState } from 'react'

export const DynamicFieldsComponent = () => {
  const { value: selectedTemplateId } = useField<string>({ path: 'template' })

  const [templateFields, setTemplateFields] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTemplate = async () => {
      if (selectedTemplateId) {
        setLoading(true)
        const res = await fetch(`/api/product-templates/${selectedTemplateId}`)
        const data = await res.json()
        if (data?.fields) {
          setTemplateFields(data.fields)
        }
        setLoading(false)
      }
    }

    fetchTemplate()
  }, [selectedTemplateId])

  if (!selectedTemplateId) {
    return <div>Please select a product template.</div>
  }

  if (loading) {
    return <div>Loading fields...</div>
  }

  return (
    <div>
      {templateFields.map(field => {
        const fieldPath = `dynamicFields.${field.key}`

        switch (field.type) {
          case 'text':
            return (
              <div key={field.key}>
                <label>{field.name}</label>
                <input name={fieldPath} type='text' />
              </div>
            )
          case 'number':
            return (
              <div key={field.key}>
                <label>{field.name}</label>
                <input name={fieldPath} type='number' />
              </div>
            )
          case 'select':
            return (
              <div key={field.key}>
                <label>{field.name}</label>
                <select name={fieldPath}>
                  {field.options?.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            )
          case 'checkbox':
            return (
              <div key={field.key}>
                <label>
                  <input name={fieldPath} type='checkbox' />
                  {field.name}
                </label>
              </div>
            )
          case 'date':
            return (
              <div key={field.key}>
                <label>{field.name}</label>
                <input name={fieldPath} type='date' />
              </div>
            )
          case 'richText':
            return (
              <div key={field.key}>
                <label>{field.name}</label>
                <textarea name={fieldPath} />
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
