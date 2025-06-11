import { Field } from 'payload'

const droneTemplate = {
  label: 'Drone',
  value: 'drone',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'wingspan',
          type: 'text',
          admin: {
            width: '50%',
            description: 'e.g., 3368mm',
          },
        },
        {
          name: 'length',
          type: 'text',
          admin: {
            width: '50%',
            description: 'e.g., 1850mm',
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
            description: 'e.g., Carbon Fiber',
          },
        },
        {
          name: 'basicEmptyWeight',
          type: 'text',
          label: 'Basic Empty Weight',
          admin: {
            width: '50%',
            description: 'Without battery and fuel (e.g., 22kg)',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'maxTakeoffWeight',
          type: 'text',
          label: 'Suggested Max. Take-off Weight',
          admin: {
            width: '50%',
            description: 'e.g., 32kg',
          },
        },
        {
          name: 'climbRate',
          type: 'text',
          label: 'Max. Fixed-wing Climb Rate',
          admin: {
            width: '50%',
            description: 'e.g., 5m/s',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'cruisingSpeed',
          type: 'text',
          admin: {
            width: '50%',
            description: 'e.g., 25m/s',
          },
        },
        {
          name: 'stallSpeed',
          type: 'text',
          admin: {
            width: '50%',
            description: 'e.g., 16m/s',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'windResistance',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Maximum wind speed drone can resist (e.g., ≤12m/s)',
          },
        },
        {
          name: 'serviceCeiling',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Maximum operating altitude (e.g., 5000m)',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'takeoffLanding',
          type: 'text',
          admin: {
            width: '50%',
            description: 'e.g., VTOL',
          },
        },
        {
          name: 'workingTemperature',
          type: 'text',
          admin: {
            width: '50%',
            description: 'e.g., -20℃ to 50℃',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'carryingCaseSize',
          type: 'text',
          admin: {
            width: '50%',
            description: 'e.g., 205cm x 53cm x 57cm',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description:
              'Optional overview or additional notes about the drone',
          },
        },
      ],
    },
  ] as Field[],
}

export default droneTemplate
