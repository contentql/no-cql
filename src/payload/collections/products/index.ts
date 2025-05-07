import { isAdmin } from '../../access/isAdmin'
import { E_COMMERCE_GROUP } from '../constants'
import { CollectionConfig } from 'payload'

import { slugField } from '@/payload/fields/slug'

import {
  revalidateProductsAfterChange,
  revalidateProductsAfterDelete,
} from './hooks/revalidateProducts'
import { productTemplates } from './product-templates'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Product',
    plural: 'Products',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'brand', 'price'],
    group: E_COMMERCE_GROUP,
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [revalidateProductsAfterChange],
    afterDelete: [revalidateProductsAfterDelete],
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
            {
              name: 'template',
              label: 'Product Template',
              type: 'select',
              options: productTemplates.map(t => ({
                label: t.label,
                value: t.value,
              })),
            },
            // Add each template's fields at the root level with condition
            ...productTemplates.map(template => ({
              name: `${template.value}Fields`,
              type: 'group' as const,
              label: `${template.label} Fields`,
              admin: {
                condition: (_: any, siblingData: any) =>
                  siblingData.template === template.value,
              },
              fields: template.fields,
            })),
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
              name: 'attributes',
              type: 'array',
              label: 'Product Attributes',
              admin: {
                description:
                  'Add key-value pairs to describe product attributes such as Color, Size, Material.',
              },
              fields: [
                {
                  name: 'key',
                  type: 'text',
                  label: 'Attribute Name',
                  required: true,
                  admin: {
                    placeholder: 'Enter attribute name (e.g., Color, Size)',
                    description:
                      'The name of the attribute (e.g., Color, Size). For example, use "Size" to define size options.',
                  },
                },
                {
                  name: 'value',
                  type: 'group',
                  label: 'Attribute Value',
                  fields: [
                    {
                      name: 'type',
                      type: 'select',
                      label: 'Value Type',
                      required: true,
                      options: [
                        { label: 'Text', value: 'text' },
                        { label: 'Select', value: 'select' },
                      ],
                      admin: {
                        description:
                          'Choose the value type for this attribute. Use "Select" for predefined options like sizes.',
                      },
                    },
                    {
                      name: 'textValue',
                      type: 'text',
                      label: 'Text Value',
                      required: true,
                      admin: {
                        condition: (_, siblingData) =>
                          siblingData?.type === 'text',
                        placeholder: 'Enter value (e.g., Red, Medium)',
                        description:
                          'The value of the attribute if it is a simple text.',
                      },
                    },
                    {
                      name: 'selectOptions',
                      type: 'array',
                      label: 'Select Options',
                      required: true,
                      admin: {
                        condition: (_, siblingData) =>
                          siblingData?.type === 'select',
                        description:
                          'Define the selectable options for this attribute (e.g., S, M, L, XL, XXL for Size).',
                      },
                      fields: [
                        {
                          name: 'option',
                          type: 'text',
                          label: 'Option',
                          required: true,
                          admin: {
                            placeholder:
                              'Enter option (e.g., S, M, L, XL, XXL)',
                            description:
                              'One of the selectable options for this attribute.',
                          },
                        },
                        {
                          name: 'extraPrice',
                          type: 'number',
                          label: 'Extra Price',
                          validate: (
                            value: number | null | undefined,
                          ): string | true => {
                            if (value != null && value < 0) {
                              return 'Extra price must be a positive value.'
                            }

                            return true
                          },
                          admin: {
                            placeholder:
                              'Enter additional price for this option (if any)',
                            description:
                              'Additional price for this option, if applicable.',
                          },
                        },
                        {
                          name: 'stock',
                          type: 'number',
                          label: 'Stock',
                          validate: (
                            value: number | null | undefined,
                          ): string | true => {
                            if (value != null && value < 0) {
                              return 'Stock cannot be negative.'
                            }

                            return true
                          },
                          admin: {
                            placeholder: 'Enter stock for this option',
                            description:
                              'Available stock for this specific option.',
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
