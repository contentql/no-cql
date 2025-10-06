import { Field } from 'payload'

const printerTemplate = {
  label: 'Printer',
  value: 'printer',
  fields: [
    // General Information
    {
      name: 'general',
      type: 'group',
      label: 'General Information',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'modelNo',
              type: 'text',
              admin: { width: '50%', description: 'e.g., Versalink B7125' },
            },
            {
              name: 'typeOfProduct',
              type: 'text',
              admin: {
                width: '50%',
                description: 'e.g., Multifunctional Printer',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'output',
              type: 'text',
              admin: { width: '50%', description: 'e.g., Black & White' },
            },
            {
              name: 'technology',
              type: 'text',
              admin: { width: '50%', description: 'e.g., Laser' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'color', type: 'text', admin: { width: '50%' } },
            {
              name: 'idealFor',
              type: 'text',
              admin: { width: '50%', description: 'e.g., Business' },
            },
          ],
        },
      ],
    },

    // Print Details
    {
      name: 'printDetails',
      type: 'group',
      label: 'Print Details',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'maximumPrintResolution',
              type: 'text',
              admin: { width: '50%', description: 'e.g., 1200 x 1200 dpi' },
            },
            {
              name: 'printSpeed',
              type: 'text',
              admin: { width: '50%', description: 'e.g., up to 25 ppm' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'copyResolution',
              type: 'text',
              label: 'Copy Resolution (max)',
              admin: { width: '50%' },
            },
            {
              name: 'function',
              type: 'text',
              admin: {
                width: '50%',
                description: 'e.g., Cloud, Copy, Email, Print, Scan',
              },
            },
          ],
        },
      ],
    },

    // Paper & Capacity
    {
      name: 'capacity',
      type: 'group',
      label: 'Paper Handling & Capacity',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'paperCapacity',
              type: 'textarea',
              admin: { width: '50%', description: 'Tray capacity details' },
            },
            {
              name: 'standardPaperCapacity',
              type: 'text',
              admin: { width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'maximumPaperCapacity',
              type: 'text',
              admin: { width: '50%' },
            },
            {
              name: 'dutyCycle',
              type: 'text',
              admin: {
                width: '50%',
                description: 'e.g., Up to 107,000 images/month',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'recommendedMonthlyVolume',
              type: 'text',
              admin: {
                label: 'Recommended Monthly Print Volume',
                width: '50%',
              },
            },
          ],
        },
      ],
    },

    // Environment
    {
      name: 'environment',
      type: 'group',
      label: 'Environmental Conditions',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'operatingTemperature',
              type: 'text',
              admin: { width: '50%' },
            },
            { name: 'relativeHumidity', type: 'text', admin: { width: '50%' } },
          ],
        },
      ],
    },

    // Power
    {
      name: 'power',
      type: 'group',
      label: 'Power & Connectivity',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'powerSource', type: 'text', admin: { width: '50%' } },
            {
              name: 'connectivity',
              type: 'textarea',
              admin: { width: '50%', description: 'e.g., Ethernet, USB, NFC' },
            },
          ],
        },
      ],
    },

    // Manufacturer Info
    {
      name: 'manufacturer',
      type: 'group',
      label: 'Manufacturer Details',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'countryOfOrigin', type: 'text', admin: { width: '50%' } },
            {
              name: 'manufacturerName',
              type: 'text',
              label: 'Name of Manufacturer / Importer / Packer',
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },
  ] as Field[],
}

export default printerTemplate
