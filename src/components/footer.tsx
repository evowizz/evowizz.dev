import type { ReactNode } from 'react'
import Link from 'next/link'
import { cva, type VariantProps } from 'cva'
import { DESTINATIONS, SITE_LOCATION } from '@/config/site'
import { Container } from '@/components/ui/container'
import { MaterialSymbol } from '@/components/ui/material-symbol'
import { Wordmark } from '@/components/wordmark'

const year = new Date().getFullYear()
const footerDestinations = [...DESTINATIONS, { label: 'Contact', path: '/#contact' }]

const footerLinkVariants = cva(
  'bg-surface-container-high hover:bg-secondary-container hover:text-on-secondary-container motion-effects-default focus-ring-on-tertiary-container flex h-full items-center justify-between gap-4 px-5 py-5 font-semibold transition-[color,background-color,border-radius] hover:rounded-3xl',
  {
    variants: {
      position: {
        topLeft: 'rounded-tl-2xl rounded-tr-[4px] rounded-br-[4px] rounded-bl-[4px]',
        topRight: 'rounded-tl-[4px] rounded-tr-2xl rounded-br-[4px] rounded-bl-[4px]',
        bottomLeft: 'rounded-tl-[4px] rounded-tr-[4px] rounded-br-[4px] rounded-bl-2xl',
        bottomRight: 'rounded-tl-[4px] rounded-tr-[4px] rounded-br-2xl rounded-bl-[4px]',
      },
    },
  },
)

type FooterLinkPosition = NonNullable<VariantProps<typeof footerLinkVariants>['position']>

function footerLinkPosition(index: number): FooterLinkPosition {
  if (index === 0) return 'topLeft'
  if (index === 1) return 'topRight'
  if (index === 2) return 'bottomLeft'
  return 'bottomRight'
}

const WordmarkLink = () => (
  <Link href="/" aria-label="Home" className="focus-ring-on-tertiary-container w-fit">
    <Wordmark className="h-auto w-20" />
  </Link>
)

const FooterLink = ({
  href,
  children,
  position,
}: {
  href: string
  children: ReactNode
  position: FooterLinkPosition
}) => (
  <Link href={href} className={footerLinkVariants({ position })}>
    {children}
  </Link>
)

const FooterMeta = () => (
  <div className="text-on-surface-variant border-on-surface-variant/15 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t pt-6 text-sm">
    <p>&copy; {year} Dylan Roussel</p>
    <p>{SITE_LOCATION}</p>
  </div>
)

export const Footer = () => (
  <footer className="reading-hide bg-surface-dim dark:bg-surface-bright text-on-surface relative z-0 -mt-10 pt-10">
    <Container className="flex flex-col py-10 lg:py-12">
      <div className="grid gap-8 pb-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <WordmarkLink />
        <nav aria-label="Footer">
          <ul className="grid h-full grid-cols-2 gap-0.5">
            {footerDestinations.map((destination, index) => (
              <li key={destination.path}>
                <FooterLink href={destination.path} position={footerLinkPosition(index)}>
                  {destination.label}
                  <MaterialSymbol name="arrow_outward" className="text-base" />
                </FooterLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <FooterMeta />
    </Container>
  </footer>
)
