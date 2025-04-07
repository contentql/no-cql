import { useFormContext } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'

interface CheckboxField {
  name: string
  label?: string | null
  width?: number | null
  required?: boolean | null
  defaultValue?: boolean | null
  id?: string | null
  blockName?: string | null
  blockType: 'checkbox'
}

const CheckboxField: React.FC<CheckboxField> = ({ name, label, width }) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
          <FormControl>
            <Checkbox {...field} />
          </FormControl>
          <FormLabel className='font-normal'>{label}</FormLabel>
        </FormItem>
      )}
    />
  )
}
export default CheckboxField
