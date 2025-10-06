import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { Ora } from 'ora'
import path from 'path'
import { getPayload } from 'payload'

const payload = await getPayload({ config: configPromise })

export const seedSiteSettings = async ({
  authorDetailsLink,
  tagDetailsLink,
  blogDetailsLink,
  authorPages,
  blogsPage,
  contactPage,
  tagsPages,
  spinner,
}: {
  authorDetailsLink: Page
  tagDetailsLink: Page
  blogDetailsLink: Page
  spinner: Ora
  tagsPages: Page
  blogsPage: Page
  contactPage: Page
  authorPages: Page
}) => {
  spinner.start('Started creating site-settings...')

  try {
    const ogImageUrl = await payload.create({
      collection: 'media',
      data: {
        alt: 'ContentQL og-image',
      },
      filePath: path.join(process.cwd(), '/public/og-image.webp'),
    })

    const faviconUrl = await payload.create({
      collection: 'media',
      data: {
        alt: 'ContentQL favicon',
      },
      filePath: path.join(process.cwd(), '/public/favicon.ico'),
    })

    const logo = await payload.create({
      collection: 'media',
      data: {
        alt: 'ContentQL logo',
      },
      filePath: path.join(process.cwd(), '/public/logo.svg'),
    })

    const result = await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        general: {
          title: 'ContentQL Theme',
          description: 'Welcome to ContentQL',
          keywords: ['ContentQL', 'Payload CMS', 'NextJS'],
          faviconUrl: faviconUrl.id,
          ogImageUrl: ogImageUrl.id,
        },
        navbar: {
          logo: {
            imageUrl: logo.id,
            description: 'ContentQL Logo',
            height: 24,
            width: 24,
          },
          menuLinks: [
            {
              group: false,
              menuLink: {
                type: 'reference',
                label: 'Blogs',
                page: {
                  relationTo: 'pages',
                  value: blogsPage.id,
                },
              },

              menuLinkGroup: {
                groupLinks: [],
              },
            },
            {
              group: false,
              menuLink: {
                type: 'reference',
                label: 'Authors',
                page: {
                  relationTo: 'pages',
                  value: authorPages.id,
                },
              },

              menuLinkGroup: {
                groupLinks: [],
              },
            },
            {
              group: false,
              menuLink: {
                type: 'reference',
                label: 'Tags',
                page: {
                  relationTo: 'pages',
                  value: tagsPages.id,
                },
              },

              menuLinkGroup: {
                groupLinks: [],
              },
            },
            {
              group: false,
              menuLink: {
                type: 'reference',
                label: 'Contact',
                page: {
                  relationTo: 'pages',
                  value: contactPage?.id,
                },
              },

              menuLinkGroup: {
                groupLinks: [],
              },
            },
            {
              group: true,
              menuLink: {
                type: 'reference',
              },
              menuLinkGroup: {
                groupTitle: 'Learn',

                groupLinks: [
                  {
                    type: 'custom',
                    newTab: true,
                    label: 'Youtube',
                    url: 'https://www.youtube.com/@contentql',
                  },
                ],
              },
            },
          ],
        },
        footer: {
          logo: {
            height: 24,
            width: 24,
            description: 'Welcome to ContentQL',
            imageUrl: logo.id,
          },
          copyright: `© ${new Date().getFullYear()} all rights reserved`,
          footerLinks: [
            {
              group: true,
              menuLink: {
                type: 'reference',
              },
              menuLinkGroup: {
                groupTitle: '📚 Content',

                groupLinks: [
                  {
                    type: 'reference',
                    label: 'Blogs',
                    page: {
                      relationTo: 'pages',
                      value: blogsPage.id,
                    },
                  },
                  {
                    type: 'reference',
                    label: 'Tags',
                    page: {
                      relationTo: 'pages',
                      value: tagsPages.id,
                    },
                  },
                ],
              },
            },
            {
              group: true,
              menuLink: {
                type: 'reference',
              },
              menuLinkGroup: {
                groupTitle: '🔗 Links',

                groupLinks: [
                  {
                    type: 'custom',
                    label: 'Youtube',
                    newTab: true,
                    url: 'https://www.youtube.com/@contentql',
                  },
                ],
              },
            },
          ],
          socialLinks: [
            {
              platform: 'youtube',
              value: 'https://youtube.com',
            },
            {
              platform: 'github',
              value: 'https://github.com/contentql',
            },
            {
              platform: 'twitter',
              value: 'https://x.com',
            },
            {
              platform: 'instagram',
              value: 'https://instagram.com',
            },
          ],
        },
        redirectionLinks: {
          authorLink: {
            relationTo: 'pages',
            value: authorDetailsLink.id,
          },
          blogLink: {
            relationTo: 'pages',
            value: blogDetailsLink.id,
          },
          tagLink: {
            relationTo: 'pages',
            value: tagDetailsLink.id,
          },
        },
        themeSettings: {
          fonts: {
            display: {
              type: 'googleFont',
              customFont: null,
              remoteFont:
                'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Michroma&display=swap',
              fontName: '"IBM Plex Mono", serif',
            },

            body: {
              type: 'googleFont',
              customFont: null,
              remoteFont:
                'https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap',
              fontName: '"Work Sans", serif',
            },
          },

          radius: 'medium',
        },
      },
    })

    spinner.succeed('Successfully created site-settings...')
    return result
  } catch (error) {
    spinner.fail('Failed creating site-settings...')
    throw error
  }
}
