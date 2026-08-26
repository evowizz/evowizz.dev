import { MaterialSymbol } from '@/components/ui/material-symbol'

type Resource = {
  title: string
  href: string
}

export function Resources({ links }: { links: Resource[] }) {
  return (
    <ul className="not-prose border-outline-variant divide-outline-variant my-8 flex flex-col divide-y overflow-hidden rounded-3xl border">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-surface-container-low focus-visible:bg-surface-container-low motion-effects-fast focus-ring flex flex-col gap-1 px-5 py-4 transition-colors md:flex-row md:items-center md:justify-between md:gap-4"
          >
            <span className="text-on-surface font-medium">{link.title}</span>
            <span className="text-on-surface-variant inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.08em] uppercase">
              {new URL(link.href).hostname.replace(/^www\./, '')}
              <MaterialSymbol name="arrow_outward" className="text-sm" />
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
