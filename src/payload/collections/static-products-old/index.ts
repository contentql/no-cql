import { CollectionConfig } from 'payload'

const StaticProducts: CollectionConfig = {
  slug: 'static-products',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Product Name',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      label: 'Product Type',
      type: 'select',
      required: true,
      options: [
        { label: 'Car', value: 'car' },
        { label: 'Bike', value: 'bike' },
      ],
    },

    //  Common Fields
    {
      name: 'brand',
      label: 'Brand',
      type: 'text',
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
    },
    {
      name: 'available',
      label: 'In Stock',
      type: 'checkbox',
      defaultValue: true,
    },

    //  Car-specific Fields
    {
      name: 'carModel',
      label: 'Car Model',
      type: 'text',
      admin: {
        condition: (data: any) => data?.type === 'car',
      },
    },
    {
      name: 'carSeats',
      label: 'Number of Seats',
      type: 'number',
      admin: {
        condition: (data: any) => data?.type === 'car',
      },
    },
    {
      name: 'fuelType',
      label: 'Fuel Type',
      type: 'select',
      options: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
      admin: {
        condition: (data: any) => data?.type === 'car',
      },
    },
    {
      name: 'transmission',
      label: 'Transmission',
      type: 'select',
      options: ['Manual', 'Automatic'],
      admin: {
        condition: (data: any) => data?.type === 'car',
      },
    },

    //  Bike-specific Fields
    {
      name: 'bikeType',
      label: 'Bike Type',
      type: 'select',
      options: ['Cruiser', 'Sport', 'Commuter', 'Electric'],
      admin: {
        condition: (data: any) => data?.type === 'bike',
      },
    },
    {
      name: 'engineCC',
      label: 'Engine CC',
      type: 'number',
      admin: {
        condition: (data: any) => data?.type === 'bike',
      },
    },
    {
      name: 'hasCarrier',
      label: 'Has Carrier',
      type: 'checkbox',
      admin: {
        condition: (data: any) => data?.type === 'bike',
      },
    },
    {
      name: 'electricStart',
      label: 'Electric Start',
      type: 'checkbox',
      admin: {
        condition: (data: any) => data?.type === 'bike',
      },
    },
  ],
}

export default StaticProducts
