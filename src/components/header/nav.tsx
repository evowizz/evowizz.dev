'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, MiddleDot } from '../svg'

export type NavDestination = {
  label: string
  path: string
}

type NavProps = {
  destinations: NavDestination[]
  onNavClick?: () => void
}

type LinkProps = {
  destination: NavDestination
  isSelected: boolean
  onClick?: () => void
}

const NavLink = ({ destination: { path, label }, isSelected, onClick }: LinkProps) => (
  <li key={path}>
    <Link
      href={path}
      onClick={onClick}
      className={cn(
        'group font-600 variation-sans motion-spatial-default relative flex w-fit items-center text-6xl opacity-70',
        isSelected && 'text-primary opacity-100',
        !isSelected &&
          'hover:font-800 motion-safe:hover:variation-width-120 gap-2 hover:opacity-90',
      )}
    >
      {label}
      {isSelected && <MiddleDot />}
    </Link>
  </li>
)

export const Nav = ({ destinations, onNavClick }: NavProps) => {
  const pathname = usePathname() ?? ''
  const isHome = pathname === '/'

  return (
    <nav>
      <ul className="space-y-6">
        {destinations.map((nav) => {
          const isSelected = nav.path === '/' ? isHome : pathname.startsWith(nav.path)
          return (
            <NavLink
              key={nav.path}
              destination={nav}
              isSelected={isSelected}
              onClick={onNavClick}
            />
          )
        })}
      </ul>
    </nav>
  )
}
