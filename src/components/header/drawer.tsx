import { cn } from '@/lib/utils'
import { BoxBlock } from '../lego/box-block'
import { Nav, NavDestination } from './nav'
import { Close } from '../svg'

type DrawerProps = {
  destinations: NavDestination[]
  isOpen: boolean
  onOutsideClick: () => void
}

export const Drawer = ({ destinations, isOpen, onOutsideClick }: DrawerProps) => {
  return (
    <>
      <BoxBlock
        className={cn(
          'fixed top-0 right-0 w-full md:w-1/3 bg-base-black-soft text-base-white-soft z-50',
          'translate-x-full transition-transform duration-300 ease-out',
          isOpen && 'transform translate-x-0',
        )}
        margin="none"
        padding="both"
      >
        {/* Close Button */}
        <div className="relative h-16 my-4 md:h-24 md:my-0 flex items-center justify-end text-lg">
          <button onClick={onOutsideClick}>
            <Close />
          </button>
        </div>  
        {/* Nav */}
        <BoxBlock className="h-screen" margin="none" padding="none">
          <Nav destinations={destinations} />
        </BoxBlock>
      </BoxBlock>

      {/* Skim */}
      <div
        className={cn(
          'pointer-events-none',
          'fixed top-0 right-0 h-screen w-full bg-black z-40 opacity-0 transition-opacity duration-300',
          isOpen && 'opacity-50 pointer-events-auto',
        )}
        onClick={onOutsideClick}
      />
    </>
  )
}
