import { useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SelectField {
  name: string
  label?: string | null
  width?: number | null
  defaultValue?: string | null
  options?:
    | {
        label: string
        value: string
        id?: string | null
      }[]
    | null
  required?: boolean | null
  id?: string | null
  blockName?: string | null
  blockType: 'select'
}

const SelectField: React.FC<SelectField> = ({ name, label, options }) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className='border'>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options?.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default SelectField
