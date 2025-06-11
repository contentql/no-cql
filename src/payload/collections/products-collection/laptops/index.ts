import { PRODUCTS_GROUP } from '../../constants'
import { CollectionConfig } from 'payload'

import { isAdmin } from '@/payload/access/isAdmin'
import { slugField } from '@/payload/fields/slug'

import {
  revalidateLaptopsAfterChange,
  revalidateLaptopsAfterDelete,
} from './hooks/revalidateLaptops'

export const Laptops: CollectionConfig = {
  slug: 'laptops',
  labels: {
    singular: 'Laptop',
    plural: 'Laptops',
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
    afterChange: [revalidateLaptopsAfterChange],
    afterDelete: [revalidateLaptopsAfterDelete],
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
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
            // General Info
            {
              name: 'general',
              type: 'group',
              label: 'General Information',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'salesPackage',
                      type: 'textarea',
                      admin: {
                        description: 'Box contents (e.g., Laptop, Adaptor)',
                        width: '50%',
                      },
                    },
                    {
                      name: 'modelNumber',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Model number (e.g., PHN16-72-77GZ)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'partNumber',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Part number(s) (comma-separated)',
                      },
                    },
                    {
                      name: 'modelName',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Model name (e.g., PHN16-72)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'series',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Series (e.g., Predator Helios Neo 16)',
                      },
                    },
                    {
                      name: 'color',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Color (e.g., Abyssal Black)',
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
                      admin: {
                        width: '50%',
                        description: 'Type (e.g., Gaming Laptop)',
                      },
                    },
                    {
                      name: 'suitableFor',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Usage (e.g., Processing & Multitasking)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'msOfficeProvided',
                      type: 'select',
                      options: ['Yes', 'No'],
                      admin: {
                        width: '50%',
                        description: 'Is MS Office included?',
                      },
                    },
                  ],
                },
              ],
            },

            // Processor & Memory
            {
              name: 'processorMemory',
              type: 'group',
              label: 'Processor and Memory Features',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'dedicatedGraphicMemoryType',
                      type: 'text',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'dedicatedGraphicMemoryCapacity',
                      type: 'text',
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'processorBrand',
                      type: 'text',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'processorName',
                      type: 'text',
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'processorGeneration',
                      type: 'text',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'processorVariant',
                      type: 'text',
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'clockSpeed',
                      type: 'text',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'graphicProcessor',
                      type: 'text',
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'ram', type: 'text', admin: { width: '50%' } },
                    { name: 'ramType', type: 'text', admin: { width: '50%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'ssd',
                      type: 'select',
                      options: ['Yes', 'No'],
                      admin: { width: '50%' },
                    },
                    {
                      name: 'ssdCapacity',
                      type: 'text',
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'storageType',
                      type: 'text',
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },

            // Operating System
            {
              name: 'operatingSystem',
              type: 'group',
              label: 'Operating System',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'os',
                      type: 'text',
                      label: 'Operating System',
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },

            // Ports
            {
              name: 'ports',
              type: 'group',
              label: 'Port and Slot Features',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'usbPorts',
                      type: 'textarea',
                      admin: { description: 'USB Ports info', width: '50%' },
                    },
                    {
                      name: 'hdmiPort',
                      type: 'text',
                      admin: { width: '50%', description: 'HDMI port info' },
                    },
                  ],
                },
              ],
            },

            // Display & Audio
            {
              name: 'displayAudio',
              type: 'group',
              label: 'Display and Audio Features',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'touchscreen',
                      type: 'select',
                      options: ['Yes', 'No'],
                      admin: { width: '50%' },
                    },
                    {
                      name: 'screenSize',
                      type: 'text',
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'screenResolution',
                      type: 'text',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'screenType',
                      type: 'textarea',
                      admin: {
                        description: 'Full screen description',
                        width: '50%',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'speakers',
                      type: 'select',
                      options: ['Yes', 'No'],
                      admin: { width: '50%' },
                    },
                    {
                      name: 'internalMic',
                      type: 'select',
                      options: ['Yes', 'No'],
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },

            // Connectivity
            {
              name: 'connectivity',
              type: 'group',
              label: 'Connectivity Features',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'wirelessLAN',
                      type: 'text',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'bluetooth',
                      type: 'text',
                      admin: { width: '50%' },
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
                      name: 'size',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'e.g., 357.78 x 278.63 x 25.95 mm',
                      },
                    },
                    {
                      name: 'weight',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Weight in Kg (e.g., 2.8 Kg)',
                      },
                    },
                  ],
                },
              ],
            },

            // Additional Features
            {
              name: 'additional',
              type: 'group',
              label: 'Additional Features',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'diskDrive',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'e.g., Not Available',
                      },
                    },
                    {
                      name: 'webCamera',
                      type: 'textarea',
                      admin: {
                        width: '50%',
                        description: 'Webcam specifications',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'keyboard',
                      type: 'textarea',
                      admin: {
                        width: '50%',
                        description: 'Keyboard description',
                      },
                    },
                  ],
                },
              ],
            },

            // Warranty
            {
              name: 'warranty',
              type: 'group',
              label: 'Warranty Details',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'warrantySummary',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'e.g., 1 Year Carry-in Warranty',
                      },
                    },
                    {
                      name: 'warrantyServiceType',
                      type: 'text',
                      admin: { width: '50%', description: 'e.g., Carry-in' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'coveredInWarranty',
                      type: 'textarea',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'notCoveredInWarranty',
                      type: 'textarea',
                      admin: { width: '50%' },
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
