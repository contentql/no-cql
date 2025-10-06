import path from 'path'
import { RequiredDataFromCollectionSlug } from 'payload'

export type BrandDataType = RequiredDataFromCollectionSlug<'brands'>

export const brandsData: BrandDataType[] = [
  {
    name: 'Apple',
    description:
      'Premium smartphones and devices known for their design, performance, and iOS ecosystem.',
    slug: 'apple',
    _status: 'published',
    image: '',
  },
  {
    name: 'Samsung',
    description:
      'Innovative smartphones with cutting-edge display technology and Android performance.',
    slug: 'samsung',
    _status: 'published',
    image: '',
  },
  {
    name: 'Dell',
    description:
      'Reliable and performance-oriented laptops for business and everyday use.',
    slug: 'dell',
    _status: 'published',
    image: '',
  },
  {
    name: 'HP',
    description:
      'Versatile laptops designed for work, school, and entertainment.',
    slug: 'hp',
    _status: 'published',
    image: '',
  },
]

export const brandsImagesData = [
  {
    alt: 'Apple',
    imageURL: path.join(process.cwd(), '/public/images/seed/apple.png'),
    name: 'apple',
  },
  {
    alt: 'Samsung',
    imageURL: path.join(process.cwd(), '/public/images/seed/samsung.png'),
    name: 'samsung',
  },
  {
    alt: 'Dell',
    imageURL: path.join(process.cwd(), '/public/images/seed/dell.png'),
    name: 'dell',
  },
  {
    alt: 'Hp',
    imageURL: path.join(process.cwd(), '/public/images/seed/hp.png'),
    name: 'hp',
  },
]
