'use client'

import { Wordmark } from '../wordmark'
import { BoxBlock } from '../lego/box-block'
import { Drawer } from './drawer'
import { useState } from 'react'
import { Menu } from '../svg'
import { Sun } from '../svg'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

const destinations = [
  { label: 'Home', path: '/' },
  { label: 'Blog', path: '/blog' },
]

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev)
  const closeDrawer = () => setIsDrawerOpen(false)
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <>
      <header className="w-full flex items-center justify-center z-50 absolute">
        <BoxBlock
          className="flex flex-row items-center justify-between w-full h-16 my-4 md:h-24 md:my-0"
          margin="both"
        >
          <Wordmark />
          <div className="flex flex-row items-center space-x-4">
            <DarkModeButton
              onClick={() => {
                setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
              }}
              visible
            />
            <button onClick={toggleDrawer}>
              <Menu className="text-lg" />
            </button>
          </div>
        </BoxBlock>
      </header>
      <Drawer destinations={destinations} isOpen={isDrawerOpen} closeDrawer={closeDrawer} />
    </>
  )
}

type DarkModeButtonProps = {
  onClick: () => void
  visible: boolean
}

const DarkModeButton = ({ onClick, visible }: DarkModeButtonProps) => {
  const containerClassName = [
    'relative',
    'duration-500',
    'cursor-pointer',
    'hover:text-foreground-inv',
    'before:transition-all',
    'before:duration-300',
    'before:inset-0',
    'before:scale-1',
    'before:opacity-0',
    'before:absolute',
    'before:rounded-full',
    'before:bg-background-inv',
    "before:content-['']",
    'hover:before:scale-[2.7]',
    'hover:before:opacity-100',
    'before:-z-10',
  ].join(' ')

  return (
    <div className="px-4 overflow-visible justify-center flex">
      <button
        className={cn(containerClassName, visible && 'visible', !visible && 'invisible')}
        onClick={onClick}
      >
        <Sun className="text-lg" />
      </button>
    </div>
  )
}
