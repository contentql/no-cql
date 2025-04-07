import path from 'path'
import { RequiredDataFromCollectionSlug } from 'payload'
import process from 'process'

export type AuthorDataType = RequiredDataFromCollectionSlug<'users'>

export const authorsImageList = [
  {
    name: 'bolt',
    imageURL: path.join(process.cwd(), '/public/images/seed/bolt.jpg'),
    alt: 'Bolt avatar image',
  },
  {
    name: 'sona',
    imageURL: path.join(process.cwd(), '/public/images/seed/sona.jpg'),
    alt: 'Sona avatar image',
  },
  {
    name: 'mimi-thian',
    imageURL: path.join(process.cwd(), '/public/images/seed/mimi-thian.jpg'),
    alt: 'Mimi thian avatar image',
  },
]

export const authorsData: AuthorDataType[] = [
  {
    username: 'bolt',
    email: 'bolt@gmail.com',
    password: 'Welcome@123',
    role: ['author', 'user'],
    displayName: 'Bolt',
    _verified: true,
    emailVerified: new Date().toISOString(),
    socialLinks: [
      {
        platform: 'youtube',
        value: 'https://www.youtube.com/',
      },
    ],
  },
  {
    username: 'sona',
    email: 'sona@gmail.com',
    password: 'Welcome@123',
    role: ['author', 'user'],
    displayName: 'Sona',
    _verified: true,
    emailVerified: new Date().toISOString(),
  },
  {
    displayName: 'Mimi Thian',
    username: 'mimi-thian',
    email: 'mimi@gmail.com',
    password: 'Welcome@123',
    role: ['author', 'user'],
    _verified: true,
    emailVerified: new Date().toISOString(),
  },
  {
    displayName: 'Admin',
    username: 'admin',
    email: 'admin@example.com',
    password: 'changeme',
    role: ['author', 'user', 'admin'],
    _verified: true,
    emailVerified: new Date().toISOString(),
  },
]
