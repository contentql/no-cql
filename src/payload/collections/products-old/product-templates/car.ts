import { Field } from 'payload'

const carTemplate = {
  label: 'Car',
  value: 'car',
  fields: [
    {
      name: 'keySpecifications',
      label: 'Key Specifications',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'engine',
              type: 'text',
              label: 'Engine',
              admin: {
                width: '50%',
                description:
                  'Type and capacity of the engine (e.g., 1.5L Turbo Petrol)',
              },
            },
            {
              name: 'transmission',
              type: 'text',
              label: 'Transmission',
              admin: {
                width: '50%',
                description: 'Type of gearbox (e.g., 6-Speed Manual, CVT)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'mileage',
              type: 'text',
              label: 'Mileage',
              admin: {
                width: '50%',
                description: 'Fuel efficiency (e.g., 18 km/l)',
              },
            },
            {
              name: 'fuelType',
              type: 'text',
              label: 'Fuel Type',
              admin: {
                width: '50%',
                description:
                  'Type of fuel the car uses (e.g., Petrol, Diesel, Electric)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'seatingCapacity',
              type: 'text',
              label: 'Seating Capacity',
              admin: {
                width: '50%',
                description: 'Number of seats in the car',
              },
            },
            {
              name: 'bodyType',
              type: 'text',
              label: 'Body Type',
              admin: {
                width: '50%',
                description: 'Type of car (e.g., SUV, Sedan, Hatchback)',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'enginePerformance',
      label: 'Engine & Performance',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'engineDisplacement',
              type: 'text',
              label: 'Displacement',
              admin: {
                width: '50%',
                description: 'Engine size in cc (e.g., 1498 cc)',
              },
            },
            {
              name: 'power',
              type: 'text',
              label: 'Power',
              admin: {
                width: '50%',
                description: 'Maximum power output (e.g., 115 bhp @ 6600 rpm)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'torque',
              type: 'text',
              label: 'Torque',
              admin: {
                width: '50%',
                description: 'Maximum torque output (e.g., 145 Nm @ 4600 rpm)',
              },
            },
            {
              name: 'cylinders',
              type: 'text',
              label: 'No. of Cylinders',
              admin: {
                width: '50%',
                description: 'Number of engine cylinders',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'gearbox',
              type: 'text',
              label: 'Gearbox',
              admin: {
                width: '50%',
                description: 'Transmission gear count and type',
              },
            },
            {
              name: 'driveType',
              type: 'text',
              label: 'Drive Type',
              admin: {
                width: '50%',
                description: 'FWD, RWD, or AWD',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'dimensions',
      label: 'Dimensions',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'length',
              type: 'text',
              label: 'Length',
              admin: {
                width: '50%',
                description: 'Overall length of the car in mm',
              },
            },
            {
              name: 'width',
              type: 'text',
              label: 'Width',
              admin: {
                width: '50%',
                description: 'Overall width of the car in mm',
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
              label: 'Height',
              admin: {
                width: '50%',
                description: 'Overall height of the car in mm',
              },
            },
            {
              name: 'wheelbase',
              type: 'text',
              label: 'Wheelbase',
              admin: {
                width: '50%',
                description: 'Distance between front and rear axles',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'bootSpace',
              type: 'text',
              label: 'Boot Space',
              admin: {
                width: '50%',
                description: 'Trunk space in liters',
              },
            },
            {
              name: 'groundClearance',
              type: 'text',
              label: 'Ground Clearance',
              admin: {
                width: '50%',
                description: 'Distance from ground to chassis',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'features',
      label: 'Features',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'sunroof',
              type: 'text',
              label: 'Sunroof',
              admin: {
                width: '50%',
                description: 'Type of sunroof (e.g., Panoramic, Electric)',
              },
            },
            {
              name: 'climateControl',
              type: 'text',
              label: 'Climate Control',
              admin: {
                width: '50%',
                description: 'Type of AC (e.g., Manual, Auto Climate Control)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'adjustableSeats',
              type: 'text',
              label: 'Adjustable Seats',
              admin: {
                width: '50%',
                description: 'Electrically or manually adjustable seats',
              },
            },
            {
              name: 'cruiseControl',
              type: 'text',
              label: 'Cruise Control',
              admin: {
                width: '50%',
                description: 'Availability of cruise control',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'keylessEntry',
              type: 'text',
              label: 'Keyless Entry',
              admin: {
                width: '50%',
                description: 'Keyless push start/stop',
              },
            },
            {
              name: 'steeringType',
              type: 'text',
              label: 'Steering Type',
              admin: {
                width: '50%',
                description: 'Power or manual steering',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'infotainment',
      label: 'Infotainment',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'touchscreen',
              type: 'text',
              label: 'Touchscreen Display',
              admin: {
                width: '50%',
                description: 'Touchscreen size and type',
              },
            },
            {
              name: 'androidAutoAppleCarplay',
              type: 'text',
              label: 'Android Auto / Apple CarPlay',
              admin: {
                width: '50%',
                description: 'Support for Android Auto and Apple CarPlay',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'speakers',
              type: 'text',
              label: 'Speakers',
              admin: {
                width: '50%',
                description: 'Number of speakers and audio quality',
              },
            },
            {
              name: 'connectivity',
              type: 'text',
              label: 'Connectivity',
              admin: {
                width: '50%',
                description: 'Bluetooth, USB, AUX, Wi-Fi, etc.',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'safety',
      label: 'Safety',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'airbags',
              type: 'text',
              label: 'Airbags',
              admin: {
                width: '50%',
                description: 'No. and placement of airbags',
              },
            },
            {
              name: 'abs',
              type: 'text',
              label: 'ABS with EBD',
              admin: {
                width: '50%',
                description: 'Availability of Anti-lock Braking System',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'tractionControl',
              type: 'text',
              label: 'Traction Control',
              admin: {
                width: '50%',
                description: 'Traction control system availability',
              },
            },
            {
              name: 'rearCamera',
              type: 'text',
              label: 'Rear Camera',
              admin: {
                width: '50%',
                description: 'Parking camera availability',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'parkingSensors',
              type: 'text',
              label: 'Parking Sensors',
              admin: {
                width: '50%',
                description: 'Front and rear parking sensors',
              },
            },
            {
              name: 'isofix',
              type: 'text',
              label: 'ISOFIX Child Seat Mounts',
              admin: {
                width: '50%',
                description: 'Availability of ISOFIX child mounts',
              },
            },
          ],
        },
      ],
    },
  ] as Field[],
}

export default carTemplate
