import { useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

interface TextareaField {
  name: string
  label?: string | null
  width?: number | null
  defaultValue?: string | null
  required?: boolean | null
  id?: string | null
  blockName?: string | null
  blockType: 'textarea'
}
const TextArea: React.FC<TextareaField> = ({ name, label }) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Textarea {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default TextArea
