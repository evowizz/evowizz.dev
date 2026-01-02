'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight } from '../svg'
import { MiddleDot } from '../svg'

export type NavDestination = {
  label: string
  path: string
}

type NavProps = {
  destinations: NavDestination[]
}

type LinkProps = {
  destination: NavDestination
  isSelected: boolean
}

const NavLink = ({ destination: { path, label }, isSelected }: LinkProps) => (
  <li key={path}>
    <Link
      href={path}
      className={cn(
        'group font-600 variation-sans flex items-center text-6xl opacity-70 transition-all duration-300',
        isSelected && 'opacity-100 text-primary',
        !isSelected && 'gap-2 hover:opacity-90 hover:font-800 motion-safe:hover:variation-width-120',
      )}
    >
      {label}
      {isSelected && <MiddleDot />}
    </Link>
  </li>
)

export const Nav = ({ destinations }: NavProps) => {
  const pathname = usePathname() ?? ''
  const isHome = pathname === '/'

  return (
    <nav>
      <ul className="space-y-6">
        {destinations.map((nav) => {
          const isSelected = nav.path === '/' ? isHome : pathname.startsWith(nav.path)
          return <NavLink key={nav.path} destination={nav} isSelected={isSelected} />
        })}
      </ul>
    </nav>
  )
}
