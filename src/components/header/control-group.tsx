'use client'

import { MaterialSymbol } from '../material-symbol'
import { MenuIcon } from './menu-icon'

type MenuButtonProps = {
  onClick: () => void
  isOpen: boolean
}

export const MenuButton = ({ onClick, isOpen }: MenuButtonProps) => {
  const label = isOpen ? 'Close menu' : 'Open menu'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-controls="site-drawer"
      aria-expanded={isOpen}
      aria-label={label}
      className="group motion-effects-default hover:bg-tertiary hover:text-on-tertiary relative flex h-10 w-10 items-center justify-center rounded-full active:scale-95"
    >
      <MenuIcon isOpen={isOpen} className="group-hover:symbol-weight-700" />
    </button>
  )
}

type DarkModeButtonProps = {
  onClick: () => void
  isDark: boolean
}

export const DarkModeButton = ({ onClick, isDark }: DarkModeButtonProps) => {
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme'

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={isDark}
      className="group hover:bg-surface-container-highest motion-effects-default relative flex h-10 w-10 items-center justify-center rounded-full active:scale-95"
      onClick={onClick}
    >
      <MaterialSymbol
        name="asterisk"
        className="group-hover:symbol-weight-700 motion-effects-fast"
      />
    </button>
  )
}

type ControlGroupProps = {
  toggleDrawer: () => void
  toggleTheme: () => void
  isScrolled: boolean
  isDrawerOpen: boolean
  isDark: boolean
}

export const ControlGroup = ({
  toggleDrawer,
  toggleTheme,
  isScrolled,
  isDrawerOpen,
  isDark,
}: ControlGroupProps) => {
  return (
    <>
      <DarkModeButton onClick={toggleTheme} isDark={isDark} />
      <div
        className={`bg-on-surface/10 motion-effects-fast mx-2 h-4 w-px self-center ${isScrolled || isDrawerOpen ? 'opacity-100' : 'opacity-0'}`}
      />
      <MenuButton onClick={toggleDrawer} isOpen={isDrawerOpen} />
    </>
  )
}
