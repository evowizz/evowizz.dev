import { Container } from '@/components/elements'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="reading-hide pt-8 pb-24">
      <Container className="text-on-surface-variant flex flex-wrap items-center justify-between gap-3 text-sm">
        <p>Dylan Roussel, {year}</p>
        <p>Nantes, France</p>
      </Container>
    </footer>
  )
}
