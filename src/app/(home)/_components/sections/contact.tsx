import { EMAIL, SOCIALS } from '@/lib/contact'
import { cn } from '@/lib/utils'
import { Container, RowLink } from '@/components/elements'
import { MaterialSymbol } from '@/components/material-symbol'
import { Reveal } from '@/components/reveal'
import { SectionTitle } from '@/components/section-title'
import { LocalTime } from '../local-time'

const EmailLink = ({ className }: { className?: string }) => (
  <a
    href={`mailto:${EMAIL}`}
    className={cn(
      'variation-sans text-on-surface hover:text-primary motion-effects-default focus-ring w-fit leading-tight font-medium tracking-tight wrap-break-word underline-offset-[0.2em] transition-colors hover:underline',
      className,
    )}
  >
    {EMAIL}
  </a>
)

const SocialRows = () => (
  <ul className="border-outline-variant divide-outline-variant flex flex-col divide-y overflow-hidden rounded-2xl border">
    {SOCIALS.map((social) => (
      <li key={social.label} className="flex flex-1">
        <RowLink href={social.href} className="group flex w-full items-center justify-between gap-4 px-5 py-3.5">
          <span className="text-on-surface text-sm font-semibold">{social.label}</span>
          <MaterialSymbol
            name="arrow_outward"
            className="text-on-surface-variant motion-spatial-fast text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </RowLink>
      </li>
    ))}
  </ul>
)

export const Contact = () => (
  <section id="contact" className="bg-surface-container-low text-on-surface scroll-mt-20 py-20 md:py-28">
    <Container className="flex flex-col gap-10 md:gap-12">
      <SectionTitle>Contact</SectionTitle>
      <Reveal stagger className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
        <div className="border-outline-variant flex flex-col items-start justify-between gap-12 rounded-2xl border p-6 md:col-span-2 md:p-7">
          <h3 className="variation-sans text-on-surface text-[clamp(2.5rem,7vw,4.5rem)] leading-none font-medium tracking-[-0.03em]">
            Say hello
          </h3>
          <EmailLink className="text-[clamp(1.25rem,3.2vw,2rem)]" />
        </div>

        <div className="bg-primary-container text-on-primary-container flex flex-col justify-center gap-3 rounded-2xl p-6 md:p-7">
          <span className="text-sm font-medium opacity-80">Nantes, France</span>
          <LocalTime />
        </div>

        <SocialRows />
      </Reveal>
    </Container>
  </section>
)
