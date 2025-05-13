import { Field } from 'payload'

const ovenTemplate = {
  label: 'Oven',
  value: 'oven',
  fields: [
    // Basic Info
    {
      name: 'basicInfo',
      type: 'group',
      label: 'Basic Info',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'brand',
              type: 'text',
              required: true,
              admin: {
                width: '50%',
                description: 'Brand of the oven (e.g., ALISTER)',
              },
            },
            {
              name: 'model',
              type: 'text',
              required: true,
              admin: {
                width: '50%',
                description: 'Model number (e.g., POE0101)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'sku',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Stock keeping unit (e.g., POOVE0101WITHSTONE)',
              },
            },
          ],
        },
      ],
    },

    // Product Dimensions
    {
      name: 'productDimensions',
      type: 'group',
      label: 'Product Dimensions (mm)',
      admin: { description: 'Physical dimensions of the product in mm' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'length',
              type: 'number',
              admin: {
                width: '50%',
                description: 'Length in mm (e.g., 875)',
              },
            },
            {
              name: 'width',
              type: 'number',
              admin: { width: '50%', description: 'Width in mm (e.g., 550)' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'height',
              type: 'number',
              admin: {
                width: '50%',
                description: 'Height in mm (e.g., 375)',
              },
            },
            {
              name: 'netWeight',
              type: 'number',
              admin: {
                width: '50%',
                description: 'Net weight in kg (e.g., 35)',
              },
            },
          ],
        },
      ],
    },

    // Packaging Dimensions
    {
      name: 'packagingDimensions',
      type: 'group',
      label: 'Packaging Dimensions',
      admin: { description: 'Dimensions and weight of packaging' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'length',
              type: 'number',
              admin: {
                width: '50%',
                description: 'Length in mm (e.g., 1050)',
              },
            },
            {
              name: 'width',
              type: 'number',
              admin: { width: '50%', description: 'Width in mm (e.g., 680)' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'height',
              type: 'number',
              admin: {
                width: '50%',
                description: 'Height in mm (e.g., 560)',
              },
            },
            {
              name: 'weight',
              type: 'number',
              admin: {
                width: '50%',
                description: 'Packaging weight in kg (e.g., 42)',
              },
            },
          ],
        },
      ],
    },

    // Material
    {
      name: 'material',
      type: 'group',
      label: 'Material',
      admin: { description: 'Materials used in the oven' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'mainBody',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Main material (e.g., Stainless Steel)',
              },
            },
            {
              name: 'otherComponent',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Other components (e.g., Powder Coated Body)',
              },
            },
          ],
        },
      ],
    },

    // Technical Details
    {
      name: 'technicalDetails',
      type: 'group',
      label: 'Technical Details',
      admin: { description: 'Power and electrical specifications' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'power',
              type: 'text',
              admin: { width: '50%', description: 'Power (e.g., 4.2Kw)' },
            },
            {
              name: 'voltage',
              type: 'text',
              admin: { width: '50%', description: 'Voltage (e.g., 220V)' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'phase',
              type: 'text',
              admin: { width: '50%', description: 'Phase (e.g., SINGLE)' },
            },
            {
              name: 'hertz',
              type: 'text',
              admin: { width: '50%', description: 'Frequency (e.g., 50 Hz)' },
            },
          ],
        },
      ],
    },

    // Other Details
    {
      name: 'otherDetails',
      type: 'group',
      label: 'Other Details',
      admin: { description: 'Operation and functionality details' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'capacity',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Capacity (e.g., 8 inch Pizza x 4pcs)',
              },
            },
            {
              name: 'temperatureRange',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Temperature range (e.g., 0–350°C)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'maxTemperature',
              type: 'number',
              admin: {
                width: '50%',
                description: 'Maximum temperature (e.g., 300°C)',
              },
            },
            {
              name: 'operationType',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Operation type (e.g., ELECTRIC)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'fuelType',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Fuel type (e.g., ELECTRICITY)',
              },
            },
            {
              name: 'insulatedBody',
              type: 'select',
              options: ['YES', 'NO'],
              admin: {
                width: '50%',
                description: 'Is the body insulated?',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'controllerType',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Controller type (e.g., ANALOG)',
              },
            },
            {
              name: 'displayType',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Display type (e.g., DIGITAL DISPLAY)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'timer',
              type: 'select',
              options: ['YES', 'NO'],
              admin: {
                width: '50%',
                description: 'Does it have a timer?',
              },
            },
            {
              name: 'installationType',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Installation type (e.g., READY TO USE)',
              },
            },
          ],
        },
      ],
    },

    // Internal Dimensions
    {
      name: 'internalDimensions',
      type: 'group',
      label: 'Internal Dimensions (inches)',
      admin: { description: 'Cooking chamber internal size' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'length',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Length (e.g., 16")',
              },
            },
            {
              name: 'widthDepth',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Width/Depth (e.g., 16")',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'height',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Height (e.g., 4.5")',
              },
            },
          ],
        },
      ],
    },
  ] as Field[],
}

export default ovenTemplate
