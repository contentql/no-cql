import { useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface NumberField {
  name: string
  label?: string | null
  width?: number | null
  defaultValue?: number | null
  required?: boolean | null
  id?: string | null
  blockName?: string | null
  blockType: 'number'
}
const Number: React.FC<NumberField> = ({ name, label }) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Input {...field} type='number' />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default Number
