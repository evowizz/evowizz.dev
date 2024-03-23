import { Wordmark } from '../wordmark'
import { BoxBlock } from '../lego/box-block'
import { Nav } from './nav'

const destinations = [
  { label: 'Home', path: '/' },
  { label: 'Blog', path: '/blog' },
]

export const Header = () => (
  <header className="w-full flex items-center justify-center z-50">
    <BoxBlock
      className="flex flex-row items-center justify-between w-full h-16 my-4 md:h-24 md:my-0"
      margin="both"
    >
      <Wordmark />
      <Nav navDestinations={destinations} />
    </BoxBlock>
  </header>
)
