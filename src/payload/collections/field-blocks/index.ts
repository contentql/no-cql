// blocks/FieldBlocks.ts
import { Block } from 'payload'

export const TextField: Block = {
  slug: 'text-field',
  labels: {
    singular: 'Text Field',
    plural: 'Text Fields',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Field Name',
      required: true,
    },
    {
      name: 'label',
      type: 'text',
      label: 'Field Label',
    },
    {
      name: 'required',
      type: 'checkbox',
      label: 'Required',
    },
  ],
}

export const NumberField: Block = {
  slug: 'number-field',
  labels: {
    singular: 'Number Field',
    plural: 'Number Fields',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Field Name',
      required: true,
    },
    {
      name: 'label',
      type: 'text',
      label: 'Field Label',
    },
    {
      name: 'required',
      type: 'checkbox',
      label: 'Required',
    },
  ],
}

export const FieldBlocks = [TextField, NumberField]
