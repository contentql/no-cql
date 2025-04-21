import path from 'path'
import { RequiredDataFromCollectionSlug } from 'payload'

export type ProductDataType = RequiredDataFromCollectionSlug<'products'>

export const productsData: ProductDataType[] = [
  {
    name: 'HP 24-inch Full HD Monitor',
    slug: 'hp-24-inch-full-hd-monitor',
    description:
      'A sleek and stylish 24-inch monitor from HP, featuring Full HD resolution and ultra-wide viewing angles.',
    brand: '', // Replace with actual brand ID for HP
    price: 149.99,
    discount: {
      percentage: 10,
      startDate: '2025-04-01',
      endDate: '2025-04-30',
    },
    finalPrice: 134.99,
    category: '', // Replace with actual monitor category ID
    tags: [{ tag: 'monitor' }, { tag: 'electronics' }, { tag: 'HP' }],
    attributes: [
      {
        key: 'Screen Size',
        value: {
          type: 'select',
          selectOptions: [{ option: '24-inch', extraPrice: 0, stock: 25 }],
        },
      },
      {
        key: 'Resolution',
        value: {
          type: 'select',
          selectOptions: [
            { option: '1920x1080 (Full HD)', extraPrice: 0, stock: 25 },
          ],
        },
      },
    ],
    images: [], // Replace with actual media IDs
    isFeatured: true,
    isNewArrival: false,
    isSpecialOffer: true,
    additionalInformationSections: [
      {
        sectionTitle: 'Specifications',
        sectionContent: [
          { attributeName: 'Display Type', attributeValue: 'IPS' },
          { attributeName: 'Refresh Rate', attributeValue: '75Hz' },
          { attributeName: 'Response Time', attributeValue: '5ms' },
        ],
      },
      {
        sectionTitle: 'Connectivity',
        sectionContent: [
          { attributeName: 'Ports', attributeValue: 'HDMI, VGA' },
        ],
      },
    ],
  },
]

export const productsImagesData = [
  {
    alt: 'hp-monitor-1',
    imageURL: path.join(process.cwd(), '/public/images/seed/hp-monitor-1.png'),
    name: 'hp-24-inch-full-hd-monitor',
  },
  {
    alt: 'hp-monitor-2',
    imageURL: path.join(process.cwd(), '/public/images/seed/hp-monitor-2.png'),
    name: 'hp-24-inch-full-hd-monitor',
  },
]
