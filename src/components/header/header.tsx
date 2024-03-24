'use client'

import { Wordmark } from '../wordmark'
import { BoxBlock } from '../lego/box-block'
import { Drawer } from './drawer'
import { useState } from 'react'
import { Menu } from '../svg'

const destinations = [
  { label: 'Home', path: '/' },
  { label: 'Blog', path: '/blog' },
]

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev)
  const closeDrawer = () => setIsDrawerOpen(false)

  return (
    <>
      <header className="w-full flex items-center justify-center z-50">
        <BoxBlock
          className="flex flex-row items-center justify-between w-full h-16 my-4 md:h-24 md:my-0"
          margin="both"
        >
          <Wordmark />
          <button onClick={toggleDrawer}>
            <Menu className='text-lg' />
          </button>
        </BoxBlock>
      </header>
      <Drawer destinations={destinations} isOpen={isDrawerOpen} onOutsideClick={closeDrawer} />
    </>
  )
}
