import { useFormContext } from 'react-hook-form'

import { CountryDropdown } from '@/components/ui/country-dropdown'
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

interface CountryField {
  name: string
  label?: string | null
  width?: number | null
  required?: boolean | null
  id?: string | null
  blockName?: string | null
  blockType: 'country'
}
const Country: React.FC<CountryField> = ({ name, label }) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <CountryDropdown
            placeholder='Country'
            defaultValue={field.value}
            onChange={country => {
              field.onChange(country.alpha3)
            }}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default Country
