'use client'

import { useEffect } from 'react'
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
  // We're disabling the scroll on the body when the drawer is open.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <BoxBlock
        className={cn(
          'bg-surface-container-highest text-on-surface-variant fixed top-0 right-0 z-50 flex h-dvh w-full flex-col md:w-1/2 md:rounded-l-4xl xl:w-1/3',
          'motion-spatial-default translate-x-full transform-gpu transition-transform',
          // Show more of the background to prevent a gap on the right when the drawer overshoots
          'after:absolute after:inset-y-0 after:left-full after:w-screen after:bg-inherit',
          isOpen && 'translate-x-0 transform',
        )}
        margin="none"
        padding="both"
      >
        {/* Header */}
        <div className="relative my-4 flex h-16 items-center justify-end text-lg md:my-0 md:h-24">
          <button onClick={closeDrawer}>
            <Close />
          </button>
        </div>

        {/* Content */}
        <BoxBlock className="flex flex-1 flex-col" margin="none" padding="none">
          <Nav destinations={destinations} />
          <div className="flex-1" />
          <DrawerFooter className="border-t-outline-variant/20 -mx-4 shrink-0 border-t px-4 pb-16" />
        </BoxBlock>
      </BoxBlock>

      {/* Scrim */}
      <div
        className={cn(
          'pointer-events-none',
          'bg-scrim/40 motion-effects-default fixed top-0 right-0 z-40 h-dvh w-full opacity-0 backdrop-blur-sm transition-opacity',
          isOpen && 'pointer-events-auto opacity-100',
        )}
        onClick={closeDrawer}
      />
    </>
  )
}
