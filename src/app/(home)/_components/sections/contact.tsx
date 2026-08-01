import { EMAIL, SOCIALS } from '@/lib/contact'
import { Container, RowLink } from '@/components/elements'
import { MaterialSymbol } from '@/components/material-symbol'
import { SectionTitle } from '@/components/section-title'
import { Reveal } from '@/components/reveal'
import { LocalTime } from '../local-time'

export const Contact = () => (
  <section id="contact" className="bg-surface-container-low text-on-surface scroll-mt-20 py-20 md:py-28">
    <Container className="flex flex-col gap-10 md:gap-12">
      <SectionTitle>Contact</SectionTitle>

      <Reveal stagger className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
        <div className="border-outline-variant flex flex-col items-start gap-6 rounded-2xl border p-6 md:col-span-2 md:p-7 lg:row-span-2">
          <h3 className="variation-sans text-on-surface text-[clamp(2.5rem,7vw,4.5rem)] leading-none font-medium tracking-[-0.03em]">
            Say hello
          </h3>
          <p className="text-on-surface-variant max-w-lg text-lg leading-relaxed md:text-xl">
            Have something worth building? My inbox is open, and I read everything that lands in it.
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="variation-sans text-on-surface hover:text-primary motion-effects-default focus-ring mt-auto pt-2 text-[clamp(1.25rem,3.2vw,2rem)] leading-tight font-medium tracking-tight wrap-break-word underline-offset-[0.2em] transition-colors hover:underline"
          >
            {EMAIL}
          </a>
        </div>

        <div className="bg-tertiary-container text-on-tertiary-container flex flex-col justify-center gap-3 rounded-2xl p-6 md:p-7">
          <span className="text-sm font-medium opacity-80">Nantes, France</span>
          <LocalTime />
        </div>

        <ul className="border-outline-variant divide-outline-variant flex flex-col divide-y overflow-hidden rounded-2xl border">
          {SOCIALS.map((social) => (
            <li key={social.label} className="flex flex-1">
              <RowLink href={social.href} className="flex w-full items-center justify-between gap-4 px-5 py-3.5">
                <span className="text-on-surface text-sm font-semibold">{social.label}</span>
                <MaterialSymbol name="arrow_outward" className="text-on-surface-variant text-base" />
              </RowLink>
            </li>
          ))}
        </ul>

        <div className="border-outline-variant flex flex-col justify-center gap-3 rounded-2xl border p-6 md:col-span-2 md:p-7">
          <p className="text-on-surface-variant text-lg leading-snug font-medium md:text-xl">
            Open to Android engineering, design systems and Material 3 work, though that list is nowhere near
            exhaustive. If you have something else in mind, ask.
          </p>
        </div>
      </Reveal>
    </Container>
  </section>
)
