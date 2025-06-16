import { env } from '@env'
import { resendAdapter } from '@payloadcms/email-resend'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { searchPlugin } from '@payloadcms/plugin-search'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { slateEditor } from '@payloadcms/richtext-slate'
import { s3Storage } from '@payloadcms/storage-s3'
import { Field, buildConfig } from 'payload'
import sharp from 'sharp'

import { isAdmin } from '@/payload/access/isAdmin'
import { Blogs } from '@/payload/collections/blogs'
import { Brands } from '@/payload/collections/brands'
import { Categories } from '@/payload/collections/categories'
import { Media } from '@/payload/collections/media'
import { Pages } from '@/payload/collections/pages'
import { Cameras } from '@/payload/collections/products-collection/cameras'
import { Cars } from '@/payload/collections/products-collection/cars'
import { DrillingMachines } from '@/payload/collections/products-collection/drilling-machines'
import { Drones } from '@/payload/collections/products-collection/drones'
import { ElectricalCurtains } from '@/payload/collections/products-collection/electrical-curtains'
import { HoverBoards } from '@/payload/collections/products-collection/hover-boards'
import { Laptops } from '@/payload/collections/products-collection/laptops'
import { Mobiles } from '@/payload/collections/products-collection/mobiles'
import { Ovens } from '@/payload/collections/products-collection/ovens'
import { Printers } from '@/payload/collections/products-collection/printers'
import { Transformers } from '@/payload/collections/products-collection/transformers'
import { Vrs } from '@/payload/collections/products-collection/vrs'
import { Tags } from '@/payload/collections/tags'
import { Test } from '@/payload/collections/test'
import { Users } from '@/payload/collections/users'
import { siteSettings } from '@/payload/globals/siteSettings'
import { disqusCommentsPlugin } from '@/payload/plugins/disqus-comments'
import { scheduleDocPublishPlugin } from '@/payload/plugins/schedule-doc-publish-plugin'
import { BeforeSyncConfig } from '@/utils/beforeSync'
import { db } from '@/utils/databaseAdapter'
import { generateBreadcrumbsUrl } from '@/utils/generateBreadcrumbsUrl'
import {
  generateDescription,
  generateImage,
  generateTitle,
  generateURL,
} from '@/utils/seo'

const formPlugin = formBuilderPlugin({
  fields: {
    payment: false,
    state: false,
  },
  formOverrides: {
    fields: ({ defaultFields }) => {
      return defaultFields.map(field => {
        if (field.type === 'blocks' && field.name === 'fields') {
          return {
            ...field,
            blocks: [
              ...field.blocks,
              {
                slug: 'upload',
                fields: [
                  {
                    type: 'row',
                    fields: [
                      {
                        name: 'name',
                        type: 'text',
                        label: 'Name (lowercase, no special characters)',
                        required: true,
                        admin: {
                          width: '50%',
                        },
                      },
                      {
                        name: 'label',
                        type: 'text',
                        label: 'Label',
                        localized: true,
                        admin: {
                          width: '50%',
                        },
                      },
                    ],
                  },
                  {
                    type: 'row',
                    fields: [
                      {
                        name: 'size',
                        label: 'Size',
                        type: 'number',
                        required: true,
                        defaultValue: 5,
                        admin: {
                          description:
                            'Enter the maximum size of each file in MB',
                          width: '50%',
                        },
                      },
                      {
                        name: 'width',
                        type: 'number',
                        label: 'Field Width (percentage)',
                        admin: {
                          width: '50%',
                        },
                      },
                    ],
                  },
                  {
                    type: 'row',
                    fields: [
                      {
                        name: 'multiple',
                        label: 'Multiple Attachments',
                        type: 'checkbox',
                        required: true,
                        defaultValue: false,
                        admin: {
                          description:
                            'Check this box if you want to allow multiple attachments',
                        },
                      },
                      {
                        name: 'required',
                        type: 'checkbox',
                        label: 'Required',
                      },
                    ],
                  },
                ],
              },
            ],
          }
        }

        return field
      })
    },
  },
  formSubmissionOverrides: {
    fields: ({ defaultFields }) => {
      const updatedDefaultFields: Field[] = defaultFields.map(field => {
        if (field.type === 'array' && field.name === 'submissionData') {
          return {
            ...field,
            fields: [
              ...field.fields,
              {
                name: 'file',
                type: 'upload',
                relationTo: 'media',
                hasMany: true,
              },
            ],
          }
        }
        return field
      })

      return [...updatedDefaultFields]
    },
  },
})

export default buildConfig({
  admin: {
    components: {
      graphics: {
        Logo: '/src/payload/style/icons/Logo.tsx',
        Icon: '/src/payload/style/icons/Icon.tsx',
      },
      // beforeDashboard: ['/src/payload/style/components/BeforeDashboard.tsx'],
    },
    user: 'users',
    meta: {
      titleSuffix: '- ContentQL',
    },
  },
  collections: [
    Users,
    Media,
    Pages,
    Blogs,
    Tags,
    Brands,
    Categories,
    Test,
    // Products,
    // ProductTemplates,
    // DynamicProducts,
    // StaticProducts,

    /* Products Collection*/
    Cameras,
    Cars,
    DrillingMachines,
    Drones,
    ElectricalCurtains,
    HoverBoards,
    Laptops,
    Mobiles,
    Ovens,
    Printers,
    Transformers,
    Vrs,
  ],
  globals: [siteSettings],
  db: db({
    databaseURI: env.DATABASE_URI,
    databaseSecret: env.DATABASE_SECRET,
    useVercelPostgresAdapter: false,
    syncDB: false,
    syncInterval: 60,
  }),
  secret: 'TESTING',
  plugins: [
    formPlugin,
    scheduleDocPublishPlugin({
      enabled: true,
      collections: ['blogs'],
      position: 'sidebar',
    }),
    nestedDocsPlugin({
      collections: ['pages'],
      generateURL: generateBreadcrumbsUrl,
    }),
    disqusCommentsPlugin({
      enabled: true,
    }),
    seoPlugin({
      collections: [
        'pages',
        'blogs',
        'tags',
        'categories',
        'products',
        'brands',
      ],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateURL: data =>
        generateURL({ data, baseURL: env.NEXT_PUBLIC_WEBSITE_URL }),
      generateTitle,
      generateDescription,
      generateImage,
    }),
    searchPlugin({
      collections: ['blogs', 'tags', 'users'],
      defaultPriorities: {
        blogs: 10,
        tags: 20,
        users: 30,
      },
      beforeSync: BeforeSyncConfig,
      searchOverrides: {
        access: {
          read: isAdmin,
        },
      },
    }),
    s3Storage({
      collections: {
        media: true,
      },
      bucket: env.S3_BUCKET!,
      config: {
        credentials: {
          accessKeyId: env.S3_ACCESS_KEY_ID!,
          secretAccessKey: env.S3_SECRET_ACCESS_KEY!,
        },
        endpoint: env.S3_ENDPOINT,
        region: env.S3_REGION,
      },
    }),
  ],
  editor: slateEditor({}),
  sharp,
  email: resendAdapter({
    apiKey: env.RESEND_API_KEY!,
    defaultFromAddress: env.RESEND_SENDER_EMAIL!,
    defaultFromName: env.RESEND_SENDER_NAME!,
  }),
})
