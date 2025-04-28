import { DynamicProduct } from '@payload-types'

import { PreviewForm } from './preview-form'
import './preview-form.css'

const RenderFields = ({ data }: { data: DynamicProduct }) => {
  const { template } = data

  const parsedTemplate = JSON.parse(JSON.stringify(template))

  // you can get data of that particular collection (row) using useLocation
  // what user selected as the structure
  // get data from your structure (can be form builder) => fields array => [{id: 1, type: 'text', label: 'First Name', name: "first_name"}, {id: 2, type: 'number', label: 'Age', name: "age"}]
  // based on the type you will generate the layout
  // just add the data what user entered into the the json filed => {"first_name": "John", "age": 25}

  return (
    <div className='preview-form'>
      <PreviewForm config={parsedTemplate} />
    </div>
  )
}

export default RenderFields
