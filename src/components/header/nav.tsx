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
        'group font-600 variation-sans motion-spatial-default relative flex items-center text-6xl opacity-70',
        isSelected &&
          'text-primary opacity-100 before:absolute before:top-1/2 before:-left-8 before:block before:h-4 before:w-4 before:-translate-y-1/2 before:rounded-full before:bg-current before:content-[""]',
        !isSelected &&
          'hover:font-800 motion-safe:hover:variation-width-120 gap-2 hover:opacity-90',
      )}
    >
      {label}
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
