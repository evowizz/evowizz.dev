import { EMAIL, SOCIALS } from '@/lib/contact'
import { Container } from '@/components/elements'
import { SectionTitle } from '@/components/section-title'
import { Reveal } from '@/components/reveal'

export const Contact = () => (
  <section id="contact" className="scroll-mt-20 py-28 md:py-44">
    <Container className="flex flex-col gap-10 md:gap-12">
      <SectionTitle>Contact</SectionTitle>

      <Reveal stagger className="flex flex-col items-start gap-8">
        <p className="text-on-surface max-w-[36rem] text-lg md:text-xl">
          Have something worth building? My inbox is open.
        </p>
        <a
          href={`mailto:${EMAIL}`}
          className="variation-sans text-on-surface hover:text-primary motion-effects-default focus-ring text-[clamp(1.9rem,8.5vw,7.5rem)] leading-none font-medium tracking-[-0.04em] transition-colors"
        >
          {EMAIL}
        </a>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
          {SOCIALS.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-surface-variant hover:text-on-surface motion-effects-fast focus-ring text-sm font-medium transition-colors"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Container>
  </section>
)
