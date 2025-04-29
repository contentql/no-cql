// blocks/FieldBlocks.ts
import { Block } from 'payload'

export const Text: Block = {
  slug: 'text',
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
      required: true,
    },
    {
      name: 'required',
      type: 'checkbox',
      label: 'Required',
      defaultValue: false,
      required: true,
    },
  ],
}

export const Number: Block = {
  slug: 'number',
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
      required: true,
    },
    {
      name: 'required',
      type: 'checkbox',
      label: 'Required',
      defaultValue: false,
      required: true,
    },
  ],
}

// ✅ New blocks

export const Checkbox: Block = {
  slug: 'checkbox',
  labels: {
    singular: 'Checkbox Field',
    plural: 'Checkbox Fields',
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
      required: true,
    },
    {
      name: 'required',
      type: 'checkbox',
      label: 'Required',
      defaultValue: false,
      required: true,
    },
  ],
}

export const Radio: Block = {
  slug: 'radio',
  labels: {
    singular: 'Radio Field',
    plural: 'Radio Fields',
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
      required: true,
    },
    {
      name: 'options',
      type: 'array',
      label: 'Options',
      labels: {
        singular: 'Option',
        plural: 'Options',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Option Label',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          label: 'Option Value',
          required: true,
        },
      ],
    },
    {
      name: 'required',
      type: 'checkbox',
      label: 'Required',
      defaultValue: false,
      required: true,
    },
  ],
}

export const Select: Block = {
  slug: 'select',
  labels: {
    singular: 'Select Field',
    plural: 'Select Fields',
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
      required: true,
    },
    {
      name: 'options',
      type: 'array',
      label: 'Options',
      labels: {
        singular: 'Option',
        plural: 'Options',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Option Label',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          label: 'Option Value',
          required: true,
        },
      ],
    },
    {
      name: 'required',
      type: 'checkbox',
      label: 'Required',
      defaultValue: false,
      required: true,
    },
  ],
}

export const Textarea: Block = {
  slug: 'textarea',
  labels: {
    singular: 'Textarea Field',
    plural: 'Textarea Fields',
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
      required: true,
    },
    {
      name: 'required',
      type: 'checkbox',
      label: 'Required',
      defaultValue: false,
      required: true,
    },
  ],
}

// Export all blocks together
export const FieldBlocks = [Text, Number, Checkbox, Radio, Select, Textarea]
