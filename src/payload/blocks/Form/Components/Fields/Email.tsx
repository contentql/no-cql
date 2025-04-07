import { useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface EmailField {
  name: string
  label?: string | null
  width?: number | null
  required?: boolean | null
  id?: string | null
  blockName?: string | null
  blockType: 'email'
}
const Email: React.FC<EmailField> = ({ name, label }) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Input type='email' {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default Email
