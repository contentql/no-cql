import { Field } from 'payload'

const electricalCurtainTemplate = {
  label: 'Electrical Curtain',
  value: 'electricalCurtain',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'color',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Color (e.g., Aluminum)',
          },
        },
        {
          name: 'material',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Material used (e.g., Aluminum)',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'mountingType',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Mounting options (e.g., Ceiling and Wall mounted)',
          },
        },
        {
          name: 'dimensions',
          type: 'text',
          admin: {
            width: '50%',
            description: 'e.g., 25L x 25W mm',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'weight',
          type: 'text',
          label: 'Item Weight',
          admin: {
            width: '50%',
            description: 'e.g., 4 Kilograms',
          },
        },
        {
          name: 'maxWeight',
          type: 'text',
          label: 'Maximum Weight Recommendation',
          admin: {
            width: '50%',
            description: 'e.g., 50 Kilograms',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'power',
          type: 'text',
          admin: {
            width: '50%',
            description: 'e.g., 40W',
          },
        },
        {
          name: 'voltage',
          type: 'text',
          admin: {
            width: '50%',
            description: 'e.g., AC100–240V',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'powerType',
          type: 'text',
          admin: {
            width: '50%',
            description: 'e.g., USA US 3 Pin Plug',
          },
        },
        {
          name: 'trackLength',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Track max length (e.g., 3.2 metres)',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'motorStrength',
          type: 'text',
          admin: {
            width: '50%',
            description: 'e.g., 1.2Nm Torque',
          },
        },
        {
          name: 'ipRating',
          type: 'text',
          label: 'Ingress Protection',
          admin: {
            width: '50%',
            description: 'e.g., IP20',
          },
        },
      ],
    },
    {
      name: 'inTheBox',
      type: 'array',
      label: 'Package Includes',
      labels: {
        singular: 'Component',
        plural: 'Included Components',
      },
      admin: {
        description: 'List of items included in the package',
      },
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Product Description',
      admin: {
        description: 'Brief overview of the curtain system',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'manufacturer',
          type: 'text',
          admin: {
            width: '50%',
            description: 'e.g., Quoya',
          },
        },
        {
          name: 'asin',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Amazon Standard Identification Number (ASIN)',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'upc',
          type: 'text',
          admin: {
            width: '50%',
            description: 'UPC code (e.g., 782290129929)',
          },
        },
        {
          name: 'netQuantity',
          type: 'text',
          admin: {
            width: '50%',
            description: 'e.g., 1.0 count',
          },
        },
      ],
    },
  ] as Field[],
}

export default electricalCurtainTemplate
