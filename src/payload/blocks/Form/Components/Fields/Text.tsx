import { useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface TextField {
  name: string
  label?: string | null
  width?: number | null
  defaultValue?: string | null
  required?: boolean | null
  id?: string | null
  blockName?: string | null
  blockType: 'text'
}

const Text: React.FC<TextField> = ({ name, label }) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default Text
