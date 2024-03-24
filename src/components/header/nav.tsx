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

export const Nav = ({ destinations }: NavProps) => {
  const pathname = usePathname() ?? ''
  const isHome = pathname === '/'

  return (
    <nav className="flex flex-col items-start">
      <ul className="space-y-8">
        {destinations.map((nav) => {
          const isSelected = nav.path === '/' ? isHome : pathname.startsWith(nav.path)
          return (
            <li key={nav.path}>
              <Link
                href={nav.path}
                className={cn('group px-4 py-1 text-5xl font-600 flex items-center', !isSelected && 'gap-2')}
              >
                {nav.label}
                <span className={cn({
                  'transition-transform group-hover:translate-x-2 motion-reduce:transform-none': !isSelected,
                  'group-hover:animate-pulse': isSelected
                })}>
                  {isSelected ? <MiddleDot /> : <ArrowRight />}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
