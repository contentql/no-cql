import { Field } from 'payload'

const laptopTemplate = {
  label: 'Laptop',
  value: 'laptop',
  fields: [
    // General Info
    {
      name: 'general',
      type: 'group',
      label: 'General Information',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'salesPackage',
              type: 'textarea',
              admin: {
                description: 'Box contents (e.g., Laptop, Adaptor)',
                width: '50%',
              },
            },
            {
              name: 'modelNumber',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Model number (e.g., PHN16-72-77GZ)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'partNumber',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Part number(s) (comma-separated)',
              },
            },
            {
              name: 'modelName',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Model name (e.g., PHN16-72)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'series',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Series (e.g., Predator Helios Neo 16)',
              },
            },
            {
              name: 'color',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Color (e.g., Abyssal Black)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'type',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Type (e.g., Gaming Laptop)',
              },
            },
            {
              name: 'suitableFor',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Usage (e.g., Processing & Multitasking)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'msOfficeProvided',
              type: 'select',
              options: ['Yes', 'No'],
              admin: { width: '50%', description: 'Is MS Office included?' },
            },
          ],
        },
      ],
    },

    // Processor & Memory
    {
      name: 'processorMemory',
      type: 'group',
      label: 'Processor and Memory Features',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'dedicatedGraphicMemoryType',
              type: 'text',
              admin: { width: '50%' },
            },
            {
              name: 'dedicatedGraphicMemoryCapacity',
              type: 'text',
              admin: { width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'processorBrand', type: 'text', admin: { width: '50%' } },
            { name: 'processorName', type: 'text', admin: { width: '50%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'processorGeneration',
              type: 'text',
              admin: { width: '50%' },
            },
            { name: 'processorVariant', type: 'text', admin: { width: '50%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'clockSpeed', type: 'text', admin: { width: '50%' } },
            { name: 'graphicProcessor', type: 'text', admin: { width: '50%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'ram', type: 'text', admin: { width: '50%' } },
            { name: 'ramType', type: 'text', admin: { width: '50%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'ssd',
              type: 'select',
              options: ['Yes', 'No'],
              admin: { width: '50%' },
            },
            { name: 'ssdCapacity', type: 'text', admin: { width: '50%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'storageType', type: 'text', admin: { width: '50%' } },
          ],
        },
      ],
    },

    // Operating System
    {
      name: 'operatingSystem',
      type: 'group',
      label: 'Operating System',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'os',
              type: 'text',
              label: 'Operating System',
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },

    // Ports
    {
      name: 'ports',
      type: 'group',
      label: 'Port and Slot Features',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'usbPorts',
              type: 'textarea',
              admin: { description: 'USB Ports info', width: '50%' },
            },
            {
              name: 'hdmiPort',
              type: 'text',
              admin: { width: '50%', description: 'HDMI port info' },
            },
          ],
        },
      ],
    },

    // Display & Audio
    {
      name: 'displayAudio',
      type: 'group',
      label: 'Display and Audio Features',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'touchscreen',
              type: 'select',
              options: ['Yes', 'No'],
              admin: { width: '50%' },
            },
            { name: 'screenSize', type: 'text', admin: { width: '50%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'screenResolution', type: 'text', admin: { width: '50%' } },
            {
              name: 'screenType',
              type: 'textarea',
              admin: { description: 'Full screen description', width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'speakers',
              type: 'select',
              options: ['Yes', 'No'],
              admin: { width: '50%' },
            },
            {
              name: 'internalMic',
              type: 'select',
              options: ['Yes', 'No'],
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },

    // Connectivity
    {
      name: 'connectivity',
      type: 'group',
      label: 'Connectivity Features',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'wirelessLAN', type: 'text', admin: { width: '50%' } },
            { name: 'bluetooth', type: 'text', admin: { width: '50%' } },
          ],
        },
      ],
    },

    // Dimensions
    {
      name: 'dimensions',
      type: 'group',
      label: 'Dimensions',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'size',
              type: 'text',
              admin: {
                width: '50%',
                description: 'e.g., 357.78 x 278.63 x 25.95 mm',
              },
            },
            {
              name: 'weight',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Weight in Kg (e.g., 2.8 Kg)',
              },
            },
          ],
        },
      ],
    },

    // Additional Features
    {
      name: 'additional',
      type: 'group',
      label: 'Additional Features',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'diskDrive',
              type: 'text',
              admin: { width: '50%', description: 'e.g., Not Available' },
            },
            {
              name: 'webCamera',
              type: 'textarea',
              admin: { width: '50%', description: 'Webcam specifications' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'keyboard',
              type: 'textarea',
              admin: { width: '50%', description: 'Keyboard description' },
            },
          ],
        },
      ],
    },

    // Warranty
    {
      name: 'warranty',
      type: 'group',
      label: 'Warranty Details',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'warrantySummary',
              type: 'text',
              admin: {
                width: '50%',
                description: 'e.g., 1 Year Carry-in Warranty',
              },
            },
            {
              name: 'warrantyServiceType',
              type: 'text',
              admin: { width: '50%', description: 'e.g., Carry-in' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'coveredInWarranty',
              type: 'textarea',
              admin: { width: '50%' },
            },
            {
              name: 'notCoveredInWarranty',
              type: 'textarea',
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },
  ] as Field[],
}

export default laptopTemplate
