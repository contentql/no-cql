import { Field } from 'payload'

const hoverboardTemplate = {
  label: 'Hoverboard',
  value: 'hoverboard',
  fields: [
    {
      name: 'specifications',
      type: 'group',
      label: 'Specifications',
      fields: [
        {
          name: 'weight',
          type: 'text',
          label: 'Weight',
          admin: { width: '50%', description: 'e.g., 10kg' },
        },
        {
          name: 'netWeight',
          type: 'text',
          label: 'Net Weight',
          admin: { width: '50%', description: 'e.g., 10kg' },
        },
        {
          name: 'battery',
          type: 'text',
          admin: { width: '50%', description: 'e.g., 36v, 4.4ah' },
        },
        {
          name: 'motor',
          type: 'text',
          admin: { width: '50%', description: 'e.g., 250W x 2 Dual Motors' },
        },
        {
          name: 'wheel',
          type: 'text',
          admin: {
            width: '50%',
            description: 'e.g., 8 Inch Solid Rubber Tire',
          },
        },
        {
          name: 'chargingTime',
          type: 'text',
          label: 'Charging Time',
          admin: { width: '50%', description: 'e.g., 3-4Hrs' },
        },
        {
          name: 'maxSpeed',
          type: 'text',
          admin: { width: '50%', description: 'e.g., 18km/h' },
        },
        {
          name: 'maxWeight',
          type: 'text',
          admin: { width: '50%', description: 'e.g., 100kg' },
        },
        {
          name: 'minWeight',
          type: 'text',
          admin: { width: '50%', description: 'e.g., 12kg' },
        },
        {
          name: 'gradeability',
          type: 'text',
          admin: { width: '50%', description: 'e.g., 18 Degrees' },
        },
        {
          name: 'material',
          type: 'text',
          admin: {
            width: '50%',
            description: 'e.g., Internal Metal Frame + ABS Plastic Body Shell',
          },
        },
      ],
    },
    {
      name: 'features',
      type: 'group',
      label: 'Features',
      fields: [
        {
          name: 'bluetoothSpeaker',
          type: 'checkbox',
          label: 'Bluetooth & Speaker',
          admin: { width: '50%' },
        },
        {
          name: 'ledWheels',
          type: 'checkbox',
          label: 'LED Wheels',
          admin: { width: '50%' },
        },
        {
          name: 'wheelArchLed',
          type: 'checkbox',
          label: 'Wheel Arch LED',
          admin: { width: '50%' },
        },
        {
          name: 'frontLeds',
          type: 'checkbox',
          label: 'Front LEDs',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'deliveryAndWarranty',
      type: 'group',
      label: 'Delivery & Warranty',
      fields: [
        {
          name: 'deliveryTime',
          type: 'text',
          admin: {
            width: '50%',
            description: 'e.g., Free Delivery & Same Day Dispatch',
          },
        },
        {
          name: 'warranty',
          type: 'text',
          admin: {
            width: '50%',
            description: 'e.g., 1 Year Warranty (refer to warranty section)',
          },
        },
      ],
    },
  ] as Field[],
}

export default hoverboardTemplate
