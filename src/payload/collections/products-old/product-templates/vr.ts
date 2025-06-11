import { Field } from 'payload'

const vrTemplates = {
  label: 'VR',
  value: 'vr',
  fields: [
    {
      type: 'group',
      name: 'info',
      label: 'Info',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'website',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Official website (e.g., https://meta.com)',
              },
            },
            {
              name: 'deviceType',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Type of VR device (e.g., Standalone)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'platform',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Software platform (e.g., Meta Quest)',
              },
            },
            {
              name: 'announced',
              type: 'date',
              admin: {
                width: '50%',
                description: 'Official announcement date',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'releaseDate',
              type: 'date',
              admin: { width: '50%', description: 'Public release date' },
            },
            {
              name: 'retailPrice',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Pricing info (e.g., $499 with controllers)',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'optics',
      label: 'Optics',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'lenses',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Lens type (e.g., Pancake lenses)',
              },
            },
            {
              name: 'ocularity',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Ocular setup (e.g., Binocular)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'ipdRange',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Interpupillary distance range (e.g., 58–71 mm)',
              },
            },
            {
              name: 'adjustableDiopter',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Prescription support (e.g., lens inserts)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'passthrough',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Camera passthrough quality (e.g., 18 PPD color)',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'display',
      label: 'Display',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'displayType',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Panel type (e.g., 2x LCD)',
              },
            },
            {
              name: 'subpixelLayout',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Pixel arrangement (e.g., RGB stripe)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'peakBrightness',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Brightness level (if available)',
              },
            },
            {
              name: 'resolution',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Per-eye resolution (e.g., 2064x2208)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'refreshRate',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Maximum refresh rate (e.g., 120Hz)',
              },
            },
            {
              name: 'visibleFoV',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Field of View (e.g., 110° horizontal)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'renderedFoV',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Software-rendered FoV (if different)',
              },
            },
            {
              name: 'binocularOverlap',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Overlap area between eyes (if known)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'averagePixelDensity',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Average pixels per degree (if known)',
              },
            },
            {
              name: 'peakPixelDensity',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Peak pixels per degree (e.g., 25 PPD)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'foveatedRendering',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Foveated rendering support',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'device',
      label: 'Device',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'dimensions',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Physical dimensions (if available)',
              },
            },
            {
              name: 'weight',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Weight with headstrap (e.g., 515g)',
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
                description: 'Build materials (e.g., plastic, foam)',
              },
            },
            {
              name: 'headstrap',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Type of headstrap (e.g., fabric)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'haptics',
              type: 'text',
              admin: {
                width: '50%',
                description: 'On-device haptics (if any)',
              },
            },
            {
              name: 'colors',
              type: 'text',
              admin: { width: '50%', description: 'Device color options' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'compliances',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Certifications (e.g., CE, FCC)',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'tracking',
      label: 'Tracking',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'trackingType',
              type: 'text',
              admin: {
                width: '50%',
                description: '6DoF/inside-out tracking type',
              },
            },
            {
              name: 'trackingFrequency',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Tracking update rate (if known)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'baseStations',
              type: 'text',
              admin: {
                width: '50%',
                description: 'External base stations required?',
              },
            },
            {
              name: 'eyeTracking',
              type: 'text',
              admin: { width: '50%', description: 'Eye tracking supported?' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'faceTracking',
              type: 'text',
              admin: { width: '50%', description: 'Face tracking supported?' },
            },
            {
              name: 'handTracking',
              type: 'text',
              admin: { width: '50%', description: 'Hand tracking supported?' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'bodyTracking',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Body or leg tracking info',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'controllers',
      label: 'Controllers',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'controllers',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Type and quantity (e.g., 2x Touch Plus)',
              },
            },
            {
              name: 'controllerWeight',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Weight of controller (if available)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'inputMethods',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Buttons, triggers, sensors included',
              },
            },
            {
              name: 'fingerTracking',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Finger/thumb tracking support',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'controllerHaptics',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Controller haptic feedback',
              },
            },
            {
              name: 'controllerBatteries',
              type: 'text',
              admin: { width: '50%', description: 'Battery type (e.g., AA)' },
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'sound',
      label: 'Sound',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'speakers',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Speaker configuration (e.g., stereo)',
              },
            },
            {
              name: 'microphone',
              type: 'text',
              admin: { width: '50%', description: 'Built-in microphone?' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'audioJack',
              type: 'text',
              admin: { width: '50%', description: '3.5mm jack availability' },
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'connectivity',
      label: 'Connectivity',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'ports',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Physical ports (e.g., USB-C)',
              },
            },
            {
              name: 'wiredVideo',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Wired video support (e.g., USB-C)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'oculusLink',
              type: 'text',
              admin: { width: '50%', description: 'Oculus Link support?' },
            },
            {
              name: 'wirelessVideo',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Wireless streaming options (e.g., AirLink)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'wifi',
              type: 'text',
              admin: { width: '50%', description: 'WiFi version (e.g., 6E)' },
            },
            {
              name: 'bluetooth',
              type: 'text',
              admin: { width: '50%', description: 'Bluetooth support' },
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'system',
      label: 'System',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'operatingSystem',
              type: 'text',
              admin: { width: '50%', description: 'OS (e.g., Android)' },
            },
            {
              name: 'chipset',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Chipset (e.g., Snapdragon XR2 Gen 2)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'cpu',
              type: 'text',
              admin: {
                width: '50%',
                description: 'CPU details (e.g., Kryo octa-core)',
              },
            },
            {
              name: 'gpu',
              type: 'text',
              admin: { width: '50%', description: 'GPU (e.g., Adreno 740)' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'memory',
              type: 'text',
              admin: { width: '50%', description: 'RAM size (e.g., 8GB)' },
            },
            {
              name: 'storage',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Internal storage (e.g., 128GB)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'sdCardSlot',
              type: 'text',
              admin: { width: '50%', description: 'SD card support' },
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'battery',
      label: 'Battery',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'batteryCapacity',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Battery size (if available)',
              },
            },
            {
              name: 'batteryLife',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Expected usage time (e.g., 2.2 hours)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'chargeTime',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Full charge duration (e.g., 2.3 hours)',
              },
            },
            {
              name: 'powerAdapter',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Charger spec (e.g., 18W adapter)',
              },
            },
          ],
        },
      ],
    },
  ] as Field[],
}

export default vrTemplates
