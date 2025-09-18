import { PRODUCTS_GROUP } from '../../constants'
import { CollectionConfig } from 'payload'

import { adminOrTenantAdminAccess } from '@/payload/access/adminOrTenantAdmin'
import { slugField } from '@/payload/fields/slug'

import {
  revalidateCamerasAfterChange,
  revalidateCamerasAfterDelete,
} from './hooks/revalidateCameras'

export const Cameras: CollectionConfig = {
  slug: 'cameras',
  labels: {
    singular: 'Camera',
    plural: 'Cameras',
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
    afterChange: [revalidateCamerasAfterChange],
    afterDelete: [revalidateCamerasAfterDelete],
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
              name: 'generalFeature',
              label: 'General Feature',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'cameraType',
                      label: 'Camera Type',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description:
                          'Type of the camera (e.g., DSLR, Mirrorless)',
                      },
                    },
                    {
                      name: 'title',
                      label: 'Title',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Full product name and lens kit',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'brand',
                      label: 'Brand',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Brand of the camera',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'sensor',
              label: 'Sensor',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'processorModel',
                      label: 'Processor Model',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Image processor model used in the camera',
                      },
                    },
                    {
                      name: 'sensorSize',
                      label: 'Size (W x H)',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Sensor dimensions (e.g., 23.5 x 15.6 mm)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'imageSensorFormat',
                      label: 'Image Sensor Format',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Sensor format (e.g., DX, Full Frame)',
                      },
                    },
                    {
                      name: 'sensorType',
                      label: 'Sensor Type',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Type of sensor (e.g., CMOS, CCD)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'effectiveResolution',
                      label: 'Effective Resolution',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Effective megapixel count (e.g., 24 MP)',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'lens',
              label: 'Lens',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'focalLength',
                      label: 'Focal Length',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Focal length range (e.g., 18-55 mm)',
                      },
                    },
                    {
                      name: 'lensType',
                      label: 'Lens Type',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Type of lens (e.g., Zoom, Prime)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'mount',
                      label: 'Mount',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Lens mount type (e.g., Nikon F)',
                      },
                    },
                    {
                      name: 'apertureRange',
                      label: 'Aperture Range',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Maximum and minimum aperture values',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'video',
              label: 'Video',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'resolutionAvailable',
                      label: 'Resolution Available',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description:
                          'Video resolution options (e.g., 1080p, 720p)',
                      },
                    },
                    {
                      name: 'fileFormat',
                      label: 'File Format',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description:
                          'Format of recorded video files (e.g., MOV)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'fps',
                      label: 'FPS',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description:
                          'Frame rates supported for different resolutions',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'flash',
              label: 'Flash',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'flashRange',
                      label: 'Flash Range',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Effective range of built-in flash',
                      },
                    },
                    {
                      name: 'flashFeatures',
                      label: 'Flash Features',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Advanced flash options and controls',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'hotShoeMount',
                      label: 'Hot Shoe/Flash Mount',
                      type: 'checkbox',
                      admin: {
                        width: '50%',
                        description: 'Availability of external flash mount',
                      },
                    },
                    {
                      name: 'builtInFlash',
                      label: 'Built-in Flash',
                      type: 'checkbox',
                      admin: {
                        width: '50%',
                        description: 'Whether camera has a built-in flash',
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
                      name: 'fileSystem',
                      label: 'Storage File System',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'File system used (e.g., DCF, EXIF)',
                      },
                    },
                    {
                      name: 'memoryCardType',
                      label: 'Memory Card Type',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Compatible memory card types',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'otherFeatures',
              label: 'Other Features',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'sceneModes',
                      label: 'Scene Modes',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Available shooting scene presets',
                      },
                    },
                    {
                      name: 'selfTimer',
                      label: 'Self Timer',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Self-timer duration options',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'iso',
                      label: 'ISO',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'ISO sensitivity range',
                      },
                    },
                    {
                      name: 'whiteBalanceType',
                      label: 'White Balance Type',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'White balance modes available',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'autoFocus',
                      label: 'Auto Focus',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Autofocus modes supported',
                      },
                    },
                    {
                      name: 'manualFocus',
                      label: 'Manual Focus',
                      type: 'checkbox',
                      admin: {
                        width: '50%',
                        description: 'Manual focus support',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'touchFocus',
                      label: 'Touch Focus',
                      type: 'checkbox',
                      admin: {
                        width: '50%',
                        description: 'Touch screen focus control',
                      },
                    },
                    {
                      name: 'imageStabilization',
                      label: 'Image Stabilization',
                      type: 'checkbox',
                      admin: {
                        width: '50%',
                        description:
                          'Whether the camera has in-body stabilization',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'microphone',
                      label: 'Microphone',
                      type: 'checkbox',
                      admin: {
                        width: '50%',
                        description: 'Built-in microphone availability',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'exposure',
              label: 'Exposure',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'exposureModes',
                      label: 'Exposure Modes',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description:
                          'Supported exposure modes (e.g., Auto, Manual)',
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
                      name: 'dimensions',
                      label: 'Dimensions (W x H x D)',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Physical size of the camera',
                      },
                    },
                    {
                      name: 'weight',
                      label: 'Weight',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Camera weight in grams',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'colorOptions',
                      label: 'Available Color Options',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Color variants of the camera',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'previewing',
              label: 'Previewing',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'displaySize',
                      label: 'Display Size',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Size of the rear LCD display',
                      },
                    },
                    {
                      name: 'viewfinder',
                      label: 'ViewFinder',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Type of optical/electronic viewfinder',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'brightnessAdjustment',
                      label: 'Brightness Adjustment',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Brightness control levels available',
                      },
                    },
                    {
                      name: 'displayResolution',
                      label: 'Display Resolution',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Number of dots (resolution) on display',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'touchscreen',
                      label: 'Touchscreen',
                      type: 'checkbox',
                      admin: {
                        width: '50%',
                        description: 'Whether display is touch-enabled',
                      },
                    },
                    {
                      name: 'moveableDisplay',
                      label: 'Moveable Display',
                      type: 'checkbox',
                      admin: {
                        width: '50%',
                        description: 'Whether the display is articulating',
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
                      name: 'usb',
                      label: 'USB',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'USB port type and version',
                      },
                    },
                    {
                      name: 'bluetooth',
                      label: 'Bluetooth',
                      type: 'text',
                      admin: { width: '50%', description: 'Bluetooth version' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'hdmi',
                      label: 'HDMI',
                      type: 'text',
                      admin: { width: '50%', description: 'HDMI port type' },
                    },
                    {
                      name: 'wifi',
                      label: 'WiFi',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'WiFi version or support',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'nfc',
                      label: 'NFC',
                      type: 'checkbox',
                      admin: { width: '50%', description: 'NFC support' },
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
                      name: 'noOfShots',
                      label: 'Number of Shots',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Number of photos per charge',
                      },
                    },
                    {
                      name: 'battery',
                      label: 'Battery',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Battery type or model',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'batteryType',
                      label: 'Battery Type',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Type of battery (e.g., Li-ion)',
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
