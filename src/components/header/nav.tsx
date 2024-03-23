'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavDestination = {
  label: string
  path: string
}

type NavProps = {
  navDestinations: NavDestination[]
}

export const Nav = ({ navDestinations }: NavProps) => {
  const pathname = usePathname() ?? ''
  const isHome = pathname === '/'

  return (
    <nav className="flex flex-row items-center justify-center gap-6">
      {navDestinations.map((nav) => {
        const isSelected = nav.path === '/' ? isHome : pathname.startsWith(nav.path)

        return (
          <Link
            href={nav.path}
            key={nav.path}
            className={cn(
              'text-base opacity-70 hover:opacity-100 font-400 hover:font-500 transition-[opacity,font-weight] duration-300',
              isSelected && 'opacity-100 font-500',
            )}
          >
            {nav.label}
          </Link>
        )
      })}
    </nav>
  )
}
