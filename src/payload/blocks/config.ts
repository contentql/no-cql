// This is just to consolidate all the existing blocks and their respective JSX components
// Always prefer to individually import the required block or JSX in other parts of your application
// Importing the block components and its configurations
import DetailsConfig from './Details/config'
import FormConfig from './Form/config'
import HeroConfig from './Hero/config'
import ListConfig from './List/config'

// Exporting an array that consolidates all block configurations
// This array is useful for registering or iterating over all blocks and their configurations in one place
export const blocksConfig = [HeroConfig, DetailsConfig, ListConfig, FormConfig]
