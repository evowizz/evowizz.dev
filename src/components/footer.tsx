import { type ReactNode } from 'react'
import { EMAIL, SOCIALS } from '@/lib/contact'
import { Container } from '@/components/elements'

const year = new Date().getFullYear()

const FooterLabel = ({ children }: { children: ReactNode }) => (
  <p className="text-inverse-on-surface/60 font-mono text-xs tracking-[0.08em] uppercase">
    {children}
  </p>
)

export function Footer() {
  return (
    <footer className="reading-hide bg-inverse-surface text-inverse-on-surface motion-effects-default transition-colors">
      {/* Page surface over the slab; its bottom corners are the inverted corner. */}
      <div
        aria-hidden
        className="bg-surface motion-effects-default h-10 rounded-b-[2.5rem] transition-colors"
      />

      <Container className="flex flex-col gap-10 pt-10 pb-14 md:flex-row md:items-start md:justify-between md:gap-6 md:pt-12 md:pb-16">
        <div className="flex flex-col gap-2">
          <FooterLabel>Contact</FooterLabel>
          <a
            href={`mailto:${EMAIL}`}
            className="variation-sans hover:text-inverse-primary motion-effects-default focus-ring-inverse-primary w-fit text-2xl font-semibold tracking-tight transition-colors md:text-3xl"
          >
            {EMAIL}
          </a>
        </div>

        <div className="flex flex-col gap-2 md:items-end">
          <FooterLabel>Elsewhere</FooterLabel>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 font-medium">
            {SOCIALS.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-inverse-primary motion-effects-default focus-ring-inverse-primary transition-colors"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-inverse-on-surface/15 border-t">
        <Container className="text-inverse-on-surface/60 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-6 text-sm">
          <p>&copy; {year} Dylan Roussel</p>
          <p>Nantes, France</p>
        </Container>
      </div>
    </footer>
  )
}
