import { Field } from 'payload'

const transformerTemplate = {
  label: 'Transformer',
  value: 'transformer',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'brandName',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
            description: 'Brand name (e.g., SEN AND PANDIT ELECTRO SYSTEM)',
          },
        },
        {
          name: 'productType',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Type of transformer (e.g., Other)',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'material',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Primary material (e.g., Metal)',
          },
        },
        {
          name: 'voltage',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Voltage rating (e.g., 440 Volt)',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phase',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Phase type (e.g., Three Phase)',
          },
        },
        {
          name: 'usage',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Typical usage (e.g., Electrical)',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'powerScope',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Power scope (e.g., Electric)',
          },
        },
        {
          name: 'price',
          type: 'number',
          admin: {
            width: '50%',
            description: 'Approximate price in INR (e.g., 85000)',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'currency',
          type: 'text',
          defaultValue: 'INR',
          admin: {
            width: '50%',
            description: 'Currency (e.g., INR)',
          },
        },
        {
          name: 'priceType',
          type: 'text',
          defaultValue: 'fixed',
          admin: {
            width: '50%',
            description: 'Price type (e.g., fixed)',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'gst',
          type: 'text',
          defaultValue: '0%',
          admin: {
            width: '50%',
            description: 'GST percentage (e.g., 0%)',
          },
        },
        {
          name: 'stockQuantity',
          type: 'number',
          defaultValue: 0,
          admin: {
            width: '50%',
            description: 'Current stock quantity (e.g., 5)',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'unitType',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Measurement unit (e.g., Piece/Pieces)',
          },
        },
        {
          name: 'productUnit',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Product unit type (e.g., 1 Piece/Pieces)',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'packSize',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Pack size (e.g., 1)',
          },
        },
        {
          name: 'mop',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Minimum order pack (e.g., 1)',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'moq',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Minimum order quantity (e.g., 1)',
          },
        },
        {
          name: 'minimumOrderedPacks',
          type: 'number',
          admin: {
            width: '50%',
            description: 'Minimum number of packs ordered (e.g., 1)',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'returnable',
          type: 'select',
          options: ['Yes', 'No'],
          admin: {
            width: '50%',
            description: 'Is the product returnable?',
          },
        },
        {
          name: 'paymentTerms',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Payment terms (e.g., Cash Advance (CA))',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'supplyAbility',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Monthly supply ability (e.g., 50 Per Month)',
          },
        },
        {
          name: 'deliveryTime',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Delivery time (e.g., 7 Days)',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'mainDomesticMarket',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Market coverage (e.g., All India)',
          },
        },
      ],
    },
  ] as Field[],
}

export default transformerTemplate
