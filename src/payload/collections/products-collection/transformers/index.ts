import { PRODUCTS_GROUP } from '../../constants'
import { CollectionConfig } from 'payload'

import { isAdmin } from '@/payload/access/isAdmin'
import { slugField } from '@/payload/fields/slug'

import {
  revalidateTransformersAfterChange,
  revalidateTransformersAfterDelete,
} from './hooks/revalidateTransformers'

export const Transformers: CollectionConfig = {
  slug: 'transformers',
  labels: {
    singular: 'Transformer',
    plural: 'Transformers',
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
    afterChange: [revalidateTransformersAfterChange],
    afterDelete: [revalidateTransformersAfterDelete],
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
            {
              type: 'row',
              fields: [
                {
                  name: 'productType',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'Type of transformer (e.g., Other)',
                  },
                },
                {
                  name: 'material',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'Primary material (e.g., Metal)',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'voltage',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'Voltage rating (e.g., 440 Volt)',
                  },
                },
                {
                  name: 'mainDomesticMarket',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'Market coverage (e.g., All India)',
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
                    description: 'Phase type (e.g., Three Phase)',
                  },
                },
                {
                  name: 'usage',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'Typical usage (e.g., Electrical)',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'currency',
                  type: 'text',
                  defaultValue: 'INR',
                  admin: {
                    width: '50%',
                    description: 'Currency (e.g., INR)',
                  },
                },
                {
                  name: 'priceType',
                  type: 'text',
                  defaultValue: 'fixed',
                  admin: {
                    width: '50%',
                    description: 'Price type (e.g., fixed)',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'gst',
                  type: 'text',
                  defaultValue: '0%',
                  admin: {
                    width: '50%',
                    description: 'GST percentage (e.g., 0%)',
                  },
                },
                {
                  name: 'stockQuantity',
                  type: 'number',
                  defaultValue: 0,
                  admin: {
                    width: '50%',
                    description: 'Current stock quantity (e.g., 5)',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'unitType',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'Measurement unit (e.g., Piece/Pieces)',
                  },
                },
                {
                  name: 'productUnit',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'Product unit type (e.g., 1 Piece/Pieces)',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'packSize',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'Pack size (e.g., 1)',
                  },
                },
                {
                  name: 'mop',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'Minimum order pack (e.g., 1)',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'moq',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'Minimum order quantity (e.g., 1)',
                  },
                },
                {
                  name: 'minimumOrderedPacks',
                  type: 'number',
                  admin: {
                    width: '50%',
                    description: 'Minimum number of packs ordered (e.g., 1)',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'returnable',
                  type: 'select',
                  options: ['Yes', 'No'],
                  admin: {
                    width: '50%',
                    description: 'Is the product returnable?',
                  },
                },
                {
                  name: 'paymentTerms',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'Payment terms (e.g., Cash Advance (CA))',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'supplyAbility',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'Monthly supply ability (e.g., 50 Per Month)',
                  },
                },
                {
                  name: 'deliveryTime',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'Delivery time (e.g., 7 Days)',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'powerScope',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'Power scope (e.g., Electric)',
                  },
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
