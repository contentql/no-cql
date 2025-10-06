import path from 'path'
import { RequiredDataFromCollectionSlug } from 'payload'

export type CategoryDataType = RequiredDataFromCollectionSlug<'categories'>

export const CategoriesData: CategoryDataType[] = [
  {
    name: 'Wearables',
    slug: 'wearables',
    description:
      'Smartwatches and fitness trackers to stay connected and healthy.',
    isFeatured: false,
    image: '',
    _status: 'published',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description:
      'Cables, chargers, cases, and more to complement your devices.',
    isFeatured: true,
    image: '',
    _status: 'published',
  },
  {
    name: 'Monitors',
    slug: 'monitors',
    description: 'High-resolution displays for gaming, work, and creativity.',
    isFeatured: false,
    image: '',
    _status: 'published',
  },
  {
    name: 'Mobile Phones',
    slug: 'mobile-phones',
    description:
      'Latest smartphones with cutting-edge technology, sleek design, and powerful performance.',
    isFeatured: true,
    image: '',
    _status: 'published',
  },
]

export const CategoriesImagesData = [
  {
    alt: 'Wearables',
    imageURL: path.join(process.cwd(), '/public/images/seed/wearables.png'),
    name: 'wearables',
  },
  {
    alt: 'Accessories',
    imageURL: path.join(process.cwd(), '/public/images/seed/accessories.png'),
    name: 'accessories',
  },
  {
    alt: 'Monitors',
    imageURL: path.join(process.cwd(), '/public/images/seed/monitors.png'),
    name: 'monitors',
  },
  {
    alt: 'Mobile Phones',
    imageURL: path.join(process.cwd(), '/public/images/seed/mobile-phone.png'),
    name: 'mobile-phones',
  },
]
