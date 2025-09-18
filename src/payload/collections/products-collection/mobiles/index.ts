import { PRODUCTS_GROUP } from '../../constants'
import { CollectionConfig } from 'payload'

import { adminOrTenantAdminAccess } from '@/payload/access/adminOrTenantAdmin'
import { slugField } from '@/payload/fields/slug'

import {
  revalidateMobilesAfterChange,
  revalidateMobilesAfterDelete,
} from './hooks/revalidateMobiles'

export const Mobiles: CollectionConfig = {
  slug: 'mobiles',
  labels: {
    singular: 'Mobile',
    plural: 'Mobiles',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'brand', 'price'],
    group: PRODUCTS_GROUP,
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [revalidateMobilesAfterChange],
    afterDelete: [revalidateMobilesAfterDelete],
  },
  access: {
    read: () => true,
    create: adminOrTenantAdminAccess,
    update: adminOrTenantAdminAccess,
    delete: adminOrTenantAdminAccess,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic Information',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  admin: {
                    placeholder: 'Enter product name',
                    description:
                      'The name of the product that will be displayed.',
                  },
                },
                slugField({
                  fieldToUse: 'name',
                  overrides: {
                    name: 'slug',
                    type: 'text',
                    required: true,
                    admin: {
                      placeholder: 'Auto-generated slug based on category name',
                      description: 'SEO-friendly URL for this category.',
                    },
                  },
                }),
              ],
            },
            {
              name: 'description',
              type: 'textarea',
              admin: {
                description: 'Provide a rich text description for the product.',
              },
            },
            {
              name: 'brand',
              type: 'relationship',
              relationTo: 'brands',
              required: true,
              hasMany: false,
              admin: {
                description: 'The manufacturer or brand of the product.',
              },
            },
          ],
        },
        {
          label: 'Pricing and Offers',
          fields: [
            {
              name: 'price',
              type: 'number',
              required: true,
              validate: (value: number | null | undefined): string | true =>
                (value != null && value >= 0) ||
                'Price must be a positive value.',
              admin: {
                placeholder: 'Enter the base price of the product',
                description: 'The price of the product before any discounts.',
              },
            },
            {
              name: 'discount',
              type: 'group',
              label: 'Discount Details',
              admin: {
                description: 'Provide details about any discounts available.',
              },
              fields: [
                {
                  name: 'percentage',
                  type: 'number',
                  min: 0,
                  max: 100,
                  admin: {
                    placeholder: 'Enter discount percentage',
                    description: 'Discount percentage to be applied.',
                  },
                  validate: (value: number | null | undefined): string | true =>
                    value == null ||
                    (value >= 0 && value <= 100) ||
                    'Discount percentage must be between 0 and 100.',
                },
                {
                  name: 'startDate',
                  type: 'date',
                  admin: {
                    placeholder: 'Select the start date of the discount',
                    description: 'The date when the discount becomes active.',
                  },
                },
                {
                  name: 'endDate',
                  type: 'date',
                  admin: {
                    placeholder: 'Select the end date of the discount',
                    description: 'The date when the discount ends.',
                  },
                  validate: (
                    value: Date | null | undefined,
                    { siblingData }: { siblingData: any },
                  ): string | true => {
                    const startDate = siblingData?.startDate

                    if (
                      startDate &&
                      value &&
                      new Date(value) < new Date(startDate)
                    ) {
                      return 'End date cannot be before the start date.'
                    }

                    return true
                  },
                },
              ],
            },
            {
              name: 'finalPrice',
              type: 'number',
              validate: (value: number | null | undefined): string | true =>
                (value != null && value >= 0) ||
                'Final price must be a positive value.',
              hooks: {
                beforeChange: [
                  ({ data }) => {
                    const basePrice = data?.price
                    const discountPercentage = data?.discount?.percentage || 0

                    if (basePrice != null) {
                      return basePrice * (1 - discountPercentage / 100)
                    }

                    return 0
                  },
                ],
              },
              admin: {
                readOnly: true,
                placeholder: 'Auto-calculated based on price and discount',
                description:
                  'The final price of the product after applying discounts.',
              },
            },
          ],
        },
        {
          label: 'Categories and Tags',
          fields: [
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              required: true,
              admin: {
                description: 'The category this product belongs to.',
              },
            },
            {
              name: 'tags',
              type: 'array',
              admin: {
                description: 'Add tags to help categorize the product.',
              },
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                  label: 'Tag',
                  admin: {
                    placeholder: 'Enter a tag',
                    description: 'A single tag for the product.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Product Features',
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
                      name: 'processor',
                      type: 'text',
                      label: 'Processor',
                      admin: {
                        width: '50%',
                        description:
                          'Processor model used in the device (e.g., Snapdragon 8 Gen 3)',
                      },
                    },
                    {
                      name: 'display',
                      type: 'text',
                      label: 'Display',
                      admin: {
                        width: '50%',
                        description:
                          'Main display features like size and type (e.g., 6.7" AMOLED)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'rearCamera',
                      type: 'text',
                      label: 'Rear Camera',
                      admin: {
                        width: '50%',
                        description:
                          'Main rear camera setup (e.g., 50MP + 12MP + 10MP)',
                      },
                    },
                    {
                      name: 'frontCamera',
                      type: 'text',
                      label: 'Front Camera',
                      admin: {
                        width: '50%',
                        description: 'Front-facing camera details (e.g., 32MP)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'ramStorage',
                      type: 'text',
                      label: 'RAM | Storage',
                      admin: {
                        width: '50%',

                        description:
                          'RAM and internal storage combo (e.g., 8GB | 128GB)',
                      },
                    },
                    {
                      name: 'battery',
                      type: 'text',
                      label: 'Battery',
                      admin: {
                        width: '50%',

                        description:
                          'Battery capacity and charging info (e.g., 5000mAh, 67W Charging)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'network',
                      type: 'text',
                      label: 'Network',
                      admin: {
                        width: '50%',

                        description:
                          'Network support details (e.g., 5G, 4G LTE)',
                      },
                    },
                    {
                      name: 'os',
                      type: 'text',
                      label: 'OS',
                      admin: {
                        width: '50%',

                        description:
                          'Operating system version (e.g., Android 14)',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'performance',
              label: 'Performance',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'chipset',
                      type: 'text',
                      label: 'Chipset',
                      admin: {
                        width: '50%',

                        description:
                          'Processor chipset used (e.g., MediaTek Dimensity 9300)',
                      },
                    },
                    {
                      name: 'cpu',
                      type: 'textarea',
                      label: 'CPU',
                      admin: {
                        width: '50%',

                        description:
                          'CPU configuration and clock speed (e.g., Octa-core 3.2GHz)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'architecture',
                      type: 'text',
                      label: 'Architecture',
                      admin: {
                        width: '50%',
                        description: 'Processor architecture (e.g., 64-bit)',
                      },
                    },
                    {
                      name: 'fabrication',
                      type: 'text',
                      label: 'Fabrication',
                      admin: {
                        width: '50%',
                        description: 'Fabrication process used (e.g., 4nm)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'ram',
                      type: 'text',
                      label: 'RAM',
                      admin: {
                        width: '50%',
                        description: 'Installed RAM (e.g., 8GB)',
                      },
                    },
                    {
                      name: 'ramType',
                      type: 'text',
                      label: 'RAM Type',
                      admin: {
                        width: '50%',
                        description: 'Type of RAM used (e.g., LPDDR5X)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'graphics',
                      type: 'text',
                      label: 'Graphics',
                      admin: {
                        width: '50%',

                        description:
                          'Graphics processor unit (e.g., Adreno 740)',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'design',
              label: 'Design',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'height',
                      type: 'text',
                      label: 'Height',
                      admin: {
                        width: '50%',
                        description: 'Height in mm (e.g., 162.3 mm)',
                      },
                    },
                    {
                      name: 'width',
                      type: 'text',
                      label: 'Width',
                      admin: {
                        width: '50%',
                        description: 'Width in mm (e.g., 75.6 mm)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'thickness',
                      type: 'text',
                      label: 'Thickness',
                      admin: {
                        width: '50%',
                        description: 'Thickness in mm (e.g., 8.9 mm)',
                      },
                    },
                    {
                      name: 'weight',
                      type: 'text',
                      label: 'Weight',
                      admin: {
                        width: '50%',
                        description: 'Weight in grams (e.g., 196g)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'build',
                      type: 'text',
                      label: 'Build',
                      admin: {
                        width: '50%',

                        description:
                          'Build material (e.g., Glass back, Plastic frame)',
                      },
                    },
                    {
                      name: 'waterResistant',
                      type: 'text',
                      label: 'Water Resistant',
                      admin: {
                        width: '50%',
                        description: 'Water resistance rating (e.g., IP68)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'ruggedness',
                      type: 'text',
                      label: 'Ruggedness',
                      admin: {
                        width: '50%',

                        description:
                          'Rugged protection features (e.g., MIL-STD-810G)',
                      },
                    },
                    {
                      name: 'unlockMethods',
                      type: 'text',
                      label: 'Screen Unlock',
                      admin: {
                        width: '50%',

                        description:
                          'Unlock methods supported (e.g., Face Unlock, Fingerprint)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'colors',
                      type: 'text',
                      label: 'Colors',
                      admin: {
                        width: '50%',

                        description:
                          'Available color variants (e.g., Black, Blue, Red)',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'display',
              label: 'Display',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'resolution',
                      type: 'text',
                      label: 'Resolution',
                      admin: {
                        width: '50%',

                        description:
                          'Screen resolution (e.g., 2400 x 1080 pixels)',
                      },
                    },
                    {
                      name: 'aspectRatio',
                      type: 'text',
                      label: 'Aspect Ratio',
                      admin: {
                        width: '50%',
                        description: 'Aspect ratio (e.g., 20:9)',
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
                      label: 'Display Type',
                      admin: {
                        width: '50%',
                        description: 'Panel type (e.g., AMOLED, IPS LCD)',
                      },
                    },
                    {
                      name: 'size',
                      type: 'text',
                      label: 'Size',
                      admin: {
                        width: '50%',
                        description: 'Screen size in inches (e.g., 6.7")',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'bezelLess',
                      type: 'text',
                      label: 'Bezel-less Display',
                      admin: {
                        width: '50%',

                        description:
                          'Whether the display is bezel-less (Yes/No)',
                      },
                    },
                    {
                      name: 'pixelDensity',
                      type: 'text',
                      label: 'Pixel Density',
                      admin: {
                        width: '50%',
                        description: 'Pixel density in PPI (e.g., 395 PPI)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'protection',
                      type: 'text',
                      label: 'Protection',
                      admin: {
                        width: '50%',

                        description:
                          'Display protection type (e.g., Gorilla Glass Victus)',
                      },
                    },
                    {
                      name: 'touchScreen',
                      type: 'text',
                      label: 'Touchscreen',
                      admin: {
                        width: '50%',
                        description: 'Touchscreen type (e.g., Capacitive)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'colorReproduction',
                      type: 'text',
                      label: 'Color Reproduction',
                      admin: {
                        width: '50%',

                        description:
                          'Color gamut support (e.g., 1B colors, DCI-P3)',
                      },
                    },
                    {
                      name: 'refreshRate',
                      type: 'text',
                      label: 'Refresh Rate',
                      admin: {
                        width: '50%',
                        description: 'Screen refresh rate in Hz (e.g., 120Hz)',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'camera',
              label: 'Camera',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'rearSetup',
                      type: 'textarea',
                      label: 'Rear Camera Setup',
                      admin: {
                        width: '50%',

                        description:
                          'Details about the rear camera modules and arrangement',
                      },
                    },
                    {
                      name: 'rearSpecs',
                      type: 'textarea',
                      label: 'Rear Camera Specs',
                      admin: {
                        width: '50%',

                        description:
                          'Tech specs like aperture, sensor size, etc.',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'frontSetup',
                      type: 'textarea',
                      label: 'Front Camera Setup',
                      admin: {
                        width: '50%',
                        description: 'Front camera configuration details',
                      },
                    },
                    {
                      name: 'frontSpecs',
                      type: 'textarea',
                      label: 'Front Camera Specs',
                      admin: {
                        width: '50%',

                        description:
                          'Specs like aperture and sensor size of front camera',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'videoRear',
                      type: 'text',
                      label: 'Video Resolution (Rear)',
                      admin: {
                        width: '50%',

                        description:
                          'Max video resolution rear camera supports (e.g., 4K@60fps)',
                      },
                    },
                    {
                      name: 'videoFront',
                      type: 'text',
                      label: 'Video Resolution (Front)',
                      admin: {
                        width: '50%',

                        description:
                          'Max video resolution front camera supports (e.g., 1080p@30fps)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'videoFeatures',
                      type: 'textarea',
                      label: 'Video Features',
                      admin: {
                        width: '50%',

                        description:
                          'Video recording features (e.g., Slow Motion, HDR)',
                      },
                    },
                    {
                      name: 'cameraFeatures',
                      type: 'textarea',
                      label: 'Camera Features',
                      admin: {
                        width: '50%',

                        description:
                          'Additional camera features (e.g., Night Mode, AI Scene Detection)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'shootingModes',
                      type: 'text',
                      label: 'Shooting Modes',
                      admin: {
                        width: '50%',

                        description:
                          'Supported photo modes (e.g., Portrait, Panorama)',
                      },
                    },
                    {
                      name: 'ois',
                      type: 'text',
                      label: 'OIS',
                      admin: {
                        width: '50%',

                        description:
                          'Optical Image Stabilization availability (Yes/No)',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'battery',
              label: 'Battery',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'capacity',
                      type: 'text',
                      label: 'Capacity',
                      admin: {
                        width: '50%',
                        description: 'Battery capacity (e.g., 5000mAh)',
                      },
                    },
                    {
                      name: 'type',
                      type: 'text',
                      label: 'Type',
                      admin: {
                        width: '50%',
                        description: 'Battery type (e.g., Li-Po)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'wirelessCharging',
                      type: 'text',
                      label: 'Wireless Charging',
                      admin: {
                        width: '50%',
                        description: 'Wireless charging supported (Yes/No)',
                      },
                    },
                    {
                      name: 'reverseCharging',
                      type: 'text',
                      label: 'Reverse Charging',
                      admin: {
                        width: '50%',
                        description: 'Supports reverse charging (Yes/No)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'fastCharging',
                      type: 'text',
                      label: 'Fast Charging',
                      admin: {
                        width: '50%',
                        description: 'Fast charging support (Yes/No)',
                      },
                    },
                    {
                      name: 'removable',
                      type: 'text',
                      label: 'Removable',
                      admin: {
                        width: '50%',
                        description: 'Is battery removable (Yes/No)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'chargingSpeed',
                      type: 'text',
                      label: 'Charging Speed',
                      admin: {
                        width: '50%',
                        description: 'Wattage of charging (e.g., 67W)',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'storage',
              label: 'Storage',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'internalMemory',
                      type: 'text',
                      label: 'Internal Memory',
                      admin: {
                        width: '50%',
                        description: 'Built-in storage (e.g., 256GB)',
                      },
                    },
                    {
                      name: 'memoryType',
                      type: 'text',
                      label: 'Memory Type',
                      admin: {
                        width: '50%',
                        description: 'Storage type (e.g., UFS 4.0)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'expandable',
                      type: 'text',
                      label: 'Expandable Memory',
                      admin: {
                        width: '50%',
                        description: 'Support for SD card (Yes/No)',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'software',
              label: 'Software',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'os',
                      type: 'text',
                      label: 'Operating System',
                      admin: {
                        width: '50%',
                        description: 'OS version (e.g., Android 14)',
                      },
                    },
                    {
                      name: 'customUI',
                      type: 'text',
                      label: 'Custom UI',
                      admin: {
                        width: '50%',
                        description: 'Custom UI on top of OS (e.g., One UI 6)',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'connectivity',
              label: 'Connectivity',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'sim',
                      type: 'text',
                      label: 'SIM Configuration',
                      admin: {
                        width: '50%',

                        description:
                          'SIM type and configuration (e.g., Dual SIM, Nano-SIM)',
                      },
                    },
                    {
                      name: 'sim1Bands',
                      type: 'textarea',
                      label: 'SIM1 Bands',
                      admin: {
                        width: '50%',
                        description: 'Network bands supported by SIM 1',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'sim2Bands',
                      type: 'textarea',
                      label: 'SIM2 Bands',
                      admin: {
                        width: '50%',
                        description: 'Network bands supported by SIM 2',
                      },
                    },
                    {
                      name: 'volte',
                      type: 'text',
                      label: 'VoLTE',
                      admin: {
                        width: '50%',
                        description: 'VoLTE supported (Yes/No)',
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
                      label: 'Wi-Fi',
                      admin: {
                        width: '50%',

                        description: 'Wi-Fi version supported (e.g., Wi-Fi 6E)',
                      },
                    },
                    {
                      name: 'wifiFeatures',
                      type: 'text',
                      label: 'Wi-Fi Features',
                      admin: {
                        width: '50%',

                        description:
                          'Advanced Wi-Fi features (e.g., Wi-Fi Direct, Hotspot)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'bluetooth',
                      type: 'text',
                      label: 'Bluetooth',
                      admin: {
                        width: '50%',
                        description: 'Bluetooth version (e.g., v5.3)',
                      },
                    },
                    {
                      name: 'usb',
                      type: 'text',
                      label: 'USB',
                      admin: {
                        width: '50%',
                        description: 'USB port type (e.g., USB Type-C)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'otg',
                      type: 'text',
                      label: 'USB OTG Support',
                      admin: {
                        width: '50%',
                        description: 'OTG supported (Yes/No)',
                      },
                    },
                    {
                      name: 'nfc',
                      type: 'text',
                      label: 'NFC',
                      admin: {
                        width: '50%',
                        description: 'NFC support (Yes/No)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'infrared',
                      type: 'text',
                      label: 'Infrared',
                      admin: {
                        width: '50%',
                        description: 'Infrared blaster available (Yes/No)',
                      },
                    },
                    {
                      name: 'gps',
                      type: 'text',
                      label: 'GPS',
                      admin: {
                        width: '50%',

                        description:
                          'GPS support and tech (e.g., A-GPS, GLONASS)',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'sensors',
              label: 'Sensors',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'fingerprint',
                      type: 'text',
                      label: 'Fingerprint Sensor',
                      admin: {
                        width: '50%',

                        description:
                          'Fingerprint sensor type (e.g., In-display, Side-mounted)',
                      },
                    },
                    {
                      name: 'faceUnlock',
                      type: 'text',
                      label: 'Face Unlock',
                      admin: {
                        width: '50%',
                        description: 'Face unlock supported (Yes/No)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'others',
                      type: 'textarea',
                      label: 'Other Sensors',
                      admin: {
                        width: '50%',

                        description:
                          'Additional sensors (e.g., Accelerometer, Gyroscope, Compass)',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Media Upload',
          fields: [
            {
              name: 'images',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              required: true,
              minRows: 1,
              admin: {
                description: 'Upload product images.',
              },
            },
          ],
        },
        {
          label: 'Product Type Flags',
          fields: [
            {
              name: 'isFeatured',
              type: 'checkbox',
              label: 'Best Seller',
              defaultValue: false,
              admin: {
                description:
                  'Mark this product as a best seller to highlight it prominently.',
              },
            },
            {
              name: 'isNewArrival',
              type: 'checkbox',
              label: 'New Arrival',
              defaultValue: true,
              admin: {
                description:
                  'Mark this product as a new arrival to indicate its recent addition.',
              },
            },
            {
              name: 'isSpecialOffer',
              type: 'checkbox',
              label: 'Special Offer',
              defaultValue: false,
              admin: {
                description:
                  'Mark this product as part of a special offer or promotion.',
              },
            },
          ],
        },
        {
          label: 'Additional Information Sections',
          fields: [
            {
              name: 'additionalInformationSections',
              type: 'array',
              label: 'Additional Product Information Sections',
              dbName: 'additionalInfo',
              admin: {
                description:
                  'Add flexible sections for additional information such as Product Details, Size & Fit, Material & Care, etc.',
              },
              fields: [
                {
                  name: 'sectionTitle',
                  type: 'text',
                  label: 'Section Title',
                  required: true,
                  admin: {
                    placeholder: 'Enter section title (e.g., Product Details)',
                    description:
                      'The title of the section (e.g., Product Details, Size & Fit). This will be displayed as the header for each additional information section.',
                  },
                },
                {
                  name: 'sectionContent',
                  type: 'array',
                  label: 'Section Content',
                  admin: {
                    description:
                      'Add attribute-value pairs to describe each section (e.g., Product Dimensions, Material, etc.). This content will provide further details under each section.',
                  },
                  fields: [
                    {
                      name: 'attributeName',
                      type: 'text',
                      label: 'Attribute Name',
                      required: true,
                      admin: {
                        placeholder:
                          'Enter attribute name (e.g., Material, Height)',
                        description:
                          'The name of the attribute in this section (e.g., Material, Height). This could describe key characteristics of the product.',
                      },
                    },
                    {
                      name: 'attributeValue',
                      type: 'text',
                      label: 'Attribute Value',
                      required: true,
                      admin: {
                        placeholder:
                          'Enter attribute value (e.g., Cotton, 12 inches)',
                        description:
                          'The value corresponding to the attribute in this section (e.g., Cotton, 12 inches). This will provide specific details for the attribute.',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
