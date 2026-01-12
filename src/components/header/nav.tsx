'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
        'group font-600 variation-sans motion-spatial-default relative flex w-fit items-center gap-2 text-6xl opacity-70 transition-all',
        isSelected
          ? 'text-primary opacity-100'
          : 'hover:font-800 motion-safe:hover:variation-width-120 pl-6 hover:opacity-90',
      )}
    >
      {isSelected && <span className="bg-primary size-4 rounded-full" />}
      {label}
    </Link>
  </li>
)

export const Nav = ({ destinations, onNavClick }: NavProps) => {
  const pathname = usePathname() ?? ''
  const isHome = pathname === '/'

  return (
    <nav>
      <ul className="flex flex-col items-start gap-6">
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
