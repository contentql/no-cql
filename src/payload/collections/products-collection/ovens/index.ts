import { PRODUCTS_GROUP } from '../../constants'
import { CollectionConfig } from 'payload'

import { isAdmin } from '@/payload/access/isAdmin'
import { slugField } from '@/payload/fields/slug'

import {
  revalidateOvensAfterChange,
  revalidateOvensAfterDelete,
} from './hooks/revalidateOvens'

export const Ovens: CollectionConfig = {
  slug: 'ovens',
  labels: {
    singular: 'Oven',
    plural: 'Ovens',
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
    afterChange: [revalidateOvensAfterChange],
    afterDelete: [revalidateOvensAfterDelete],
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
            // Basic Info
            {
              name: 'basicInfo',
              type: 'group',
              label: 'Basic Info',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'sku',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description:
                          'Stock keeping unit (e.g., POOVE0101WITHSTONE)',
                      },
                    },
                  ],
                },
              ],
            },

            // Product Dimensions
            {
              name: 'productDimensions',
              type: 'group',
              label: 'Product Dimensions (mm)',
              admin: {
                description: 'Physical dimensions of the product in mm',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'length',
                      type: 'number',
                      admin: {
                        width: '50%',
                        description: 'Length in mm (e.g., 875)',
                      },
                    },
                    {
                      name: 'width',
                      type: 'number',
                      admin: {
                        width: '50%',
                        description: 'Width in mm (e.g., 550)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'height',
                      type: 'number',
                      admin: {
                        width: '50%',
                        description: 'Height in mm (e.g., 375)',
                      },
                    },
                    {
                      name: 'netWeight',
                      type: 'number',
                      admin: {
                        width: '50%',
                        description: 'Net weight in kg (e.g., 35)',
                      },
                    },
                  ],
                },
              ],
            },

            // Packaging Dimensions
            {
              name: 'packagingDimensions',
              type: 'group',
              label: 'Packaging Dimensions',
              admin: { description: 'Dimensions and weight of packaging' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'length',
                      type: 'number',
                      admin: {
                        width: '50%',
                        description: 'Length in mm (e.g., 1050)',
                      },
                    },
                    {
                      name: 'width',
                      type: 'number',
                      admin: {
                        width: '50%',
                        description: 'Width in mm (e.g., 680)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'height',
                      type: 'number',
                      admin: {
                        width: '50%',
                        description: 'Height in mm (e.g., 560)',
                      },
                    },
                    {
                      name: 'weight',
                      type: 'number',
                      admin: {
                        width: '50%',
                        description: 'Packaging weight in kg (e.g., 42)',
                      },
                    },
                  ],
                },
              ],
            },

            // Material
            {
              name: 'material',
              type: 'group',
              label: 'Material',
              admin: { description: 'Materials used in the oven' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'mainBody',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Main material (e.g., Stainless Steel)',
                      },
                    },
                    {
                      name: 'otherComponent',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description:
                          'Other components (e.g., Powder Coated Body)',
                      },
                    },
                  ],
                },
              ],
            },

            // Technical Details
            {
              name: 'technicalDetails',
              type: 'group',
              label: 'Technical Details',
              admin: { description: 'Power and electrical specifications' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'power',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Power (e.g., 4.2Kw)',
                      },
                    },
                    {
                      name: 'voltage',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Voltage (e.g., 220V)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'phase',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Phase (e.g., SINGLE)',
                      },
                    },
                    {
                      name: 'hertz',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Frequency (e.g., 50 Hz)',
                      },
                    },
                  ],
                },
              ],
            },

            // Other Details
            {
              name: 'otherDetails',
              type: 'group',
              label: 'Other Details',
              admin: { description: 'Operation and functionality details' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'capacity',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Capacity (e.g., 8 inch Pizza x 4pcs)',
                      },
                    },
                    {
                      name: 'temperatureRange',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Temperature range (e.g., 0–350°C)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'maxTemperature',
                      type: 'number',
                      admin: {
                        width: '50%',
                        description: 'Maximum temperature (e.g., 300°C)',
                      },
                    },
                    {
                      name: 'operationType',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Operation type (e.g., ELECTRIC)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'fuelType',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Fuel type (e.g., ELECTRICITY)',
                      },
                    },
                    {
                      name: 'insulatedBody',
                      type: 'select',
                      options: ['YES', 'NO'],
                      admin: {
                        width: '50%',
                        description: 'Is the body insulated?',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'controllerType',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Controller type (e.g., ANALOG)',
                      },
                    },
                    {
                      name: 'displayType',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Display type (e.g., DIGITAL DISPLAY)',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'timer',
                      type: 'select',
                      options: ['YES', 'NO'],
                      admin: {
                        width: '50%',
                        description: 'Does it have a timer?',
                      },
                    },
                    {
                      name: 'installationType',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Installation type (e.g., READY TO USE)',
                      },
                    },
                  ],
                },
              ],
            },

            // Internal Dimensions
            {
              name: 'internalDimensions',
              type: 'group',
              label: 'Internal Dimensions (inches)',
              admin: { description: 'Cooking chamber internal size' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'length',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Length (e.g., 16")',
                      },
                    },
                    {
                      name: 'widthDepth',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Width/Depth (e.g., 16")',
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
                      admin: {
                        width: '50%',
                        description: 'Height (e.g., 4.5")',
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
