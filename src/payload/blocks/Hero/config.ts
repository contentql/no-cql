import { Block } from 'payload'

const HomeConfig: Block = {
  slug: 'HeroBlock',
  interfaceName: 'HeroType',
  labels: {
    singular: 'Hero Block',
    plural: 'Hero Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'subHeading',
      type: 'text',
      label: 'Sub Heading',
    },
  ],
}

export default HomeConfig
