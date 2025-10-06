import { Page } from 'payload-types'

export type HomePageDataType = Omit<Page, 'id' | 'createdAt' | 'updatedAt'>

export const homePageData: HomePageDataType = {
  title: 'Home Page',
  isHome: true,
  _status: 'published',
  layout: [
    {
      blockType: 'HeroBlock',
      heading: 'Develop your own',
      subHeading: 'Theme With Cql',
    },
  ],
}
