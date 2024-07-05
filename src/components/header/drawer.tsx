import { cn } from '@/lib/utils'
import { BoxBlock } from '../lego/box-block'
import { Nav, NavDestination } from './nav'
import { Close } from '../svg'
import { DrawerFooter } from './drawer-footer'

type DrawerProps = {
  destinations: NavDestination[]
  isOpen: boolean
  closeDrawer: () => void
}

export const Drawer = ({ destinations, isOpen, closeDrawer }: DrawerProps) => {
  return (
    <>
      <BoxBlock
        className={cn(
          'flex flex-col fixed top-0 right-0 h-dvh w-full md:w-1/2 xl:w-1/3 bg-base-black text-base-white-soft z-50',
          'translate-x-full transition-transform duration-300 ease-out transform-gpu',
          isOpen && 'transform translate-x-0',
        )}
        margin="none"
        padding="both"
      >
        {/* Close Button */}
        <div className="relative h-16 my-4 md:h-24 md:my-0 flex items-center justify-end text-lg">
          <button onClick={closeDrawer}>
            <Close />
          </button>
        </div>
        {/* Nav */}
        <BoxBlock className="h-full flex flex-col justify-between flex-wrap" margin="none" padding="none">
          <Nav destinations={destinations} />
          <DrawerFooter className="border-t border-t-foreground-inv/20 pb-16 -mx-4 px-4" />
        </BoxBlock>
      </BoxBlock>

      {/* Scrim */}
      <div
        className={cn(
          'pointer-events-none',
          'fixed top-0 right-0 h-dvh w-full bg-black z-40 opacity-0 transition-opacity duration-300',
          isOpen && 'opacity-75 pointer-events-auto',
        )}
        onClick={closeDrawer}
      />
    </>
  )
}
