import { Field } from 'payload'

const drillingMachineTemplate = {
  label: 'Drilling Machine',
  value: 'drilling-machine',
  fields: [
    // Key Attributes
    {
      name: 'keyAttributes',
      type: 'group',
      label: 'Key Attributes',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'type',
              type: 'text',
              admin: { width: '50%', description: 'e.g., Rotary Drilling Rig' },
            },
            {
              name: 'powerType',
              type: 'text',
              admin: { width: '50%', description: 'e.g., Diesel' },
            },
          ],
        },

        {
          type: 'row',
          fields: [
            {
              name: 'use',
              type: 'text',
              admin: { width: '50%', description: 'e.g., Water Well' },
            },
            {
              name: 'voltage',
              type: 'text',
              admin: { width: '50%', description: 'e.g., 380V' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'drillingDiameter',
              type: 'text',
              admin: { width: '50%', description: 'e.g., 130-300mm' },
            },
            {
              name: 'drillingDepth',
              type: 'text',
              admin: { width: '50%', description: 'e.g., Max. 200m or 220m' },
            },
          ],
        },
      ],
    },

    // Other Attributes
    {
      name: 'otherAttributes',
      type: 'group',
      label: 'Other Attributes',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'placeOfOrigin', type: 'text', admin: { width: '50%' } },
            {
              name: 'weight',
              type: 'text',
              admin: { width: '50%', description: 'e.g., 6500 KG' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'warranty',
              type: 'text',
              admin: { width: '50%', description: 'e.g., 1 Year' },
            },
            {
              name: 'coreComponents',
              type: 'text',
              admin: { width: '50%', description: 'e.g., motor, pump, engine' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'keySellingPoints', type: 'text', admin: { width: '50%' } },
            {
              name: 'mobility',
              type: 'text',
              admin: {
                width: '50%',
                description: 'e.g., Crawler type pneumatic rig',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'rotateSpeed',
              type: 'text',
              admin: { width: '50%', description: 'e.g., 2200r/min' },
            },
            {
              name: 'airConsumption',
              type: 'text',
              admin: { width: '50%', description: 'e.g., 17-27m³/min' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'drillRodLength',
              type: 'text',
              admin: { width: '50%', description: 'e.g., 3m' },
            },
            {
              name: 'color',
              type: 'text',
              admin: { width: '50%', description: 'e.g., red/yellow' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'advantage',
              type: 'text',
              admin: { width: '50%', description: 'e.g., Reliable' },
            },
          ],
        },
      ],
    },

    // Identity
    {
      name: 'productIdentity',
      type: 'group',
      label: 'Product Identity',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'productName',
              type: 'text',
              admin: {
                width: '50%',
                description: 'e.g., DTH drilling machine',
              },
            },
            {
              name: 'brandName',
              type: 'text',
              admin: { width: '50%', description: 'e.g., Hengwang' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'keyword',
              type: 'text',
              admin: {
                width: '50%',
                description: 'e.g., dth drilling machine price',
              },
            },
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
              name: 'productDimensions',
              type: 'text',
              label: 'Machine Dimensions (L*W*H)',
              admin: { width: '50%', description: 'e.g., 3442*2200*2800mm' },
            },
            {
              name: 'singlePackageSize',
              type: 'text',
              admin: { width: '50%', description: 'e.g., 410x190x260 cm' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'singleGrossWeight',
              type: 'text',
              admin: { width: '50%', description: 'e.g., 6400 kg' },
            },
          ],
        },
      ],
    },

    // Reports & Inspection
    {
      name: 'inspection',
      type: 'group',
      label: 'Inspection & Reports',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'machineryTestReport',
              type: 'text',
              admin: { width: '50%' },
            },
            {
              name: 'videoOutgoingInspection',
              type: 'text',
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },

    // Packaging & Delivery
    {
      name: 'packagingDelivery',
      type: 'group',
      label: 'Packaging & Delivery',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'packagingDetails',
              type: 'textarea',
              admin: { width: '50%' },
            },
            {
              name: 'port',
              type: 'text',
              admin: {
                width: '50%',
                description: 'e.g., Qingdao/Shanghai/Tianjin',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'sellingUnits',
              type: 'text',
              admin: { width: '50%', description: 'e.g., Single item' },
            },
          ],
        },
      ],
    },

    // Supply Info
    {
      name: 'supplyInfo',
      type: 'group',
      label: 'Supply Ability',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'supplyAbility',
              type: 'text',
              admin: {
                width: '50%',
                description: 'e.g., 50 Set/Sets per Week',
              },
            },
          ],
        },
      ],
    },
  ] as Field[],
}

export default drillingMachineTemplate
