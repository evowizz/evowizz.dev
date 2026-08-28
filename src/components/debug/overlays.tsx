export const OVERLAYS = [
  { id: 'none', label: 'Off' },
  { id: 'container', label: 'Container' },
  { id: 'baseline', label: 'Baseline' },
] as const

export type Overlay = (typeof OVERLAYS)[number]['id']

const TINT = 'color-mix(in oklab, var(--color-error) 45%, transparent)'
const TINT_SOFT = 'color-mix(in oklab, var(--color-error) 20%, transparent)'

export const OverlayLayer = ({ overlay }: { overlay: Overlay }) => {
  if (overlay === 'none') return null

  if (overlay === 'baseline') {
    return (
      <div
        data-devbar
        aria-hidden
        className="pointer-events-none fixed inset-0 z-70"
        style={{
          backgroundImage: `repeating-linear-gradient(to bottom, ${TINT_SOFT} 0 1px, transparent 1px 8px)`,
        }}
      />
    )
  }

  // Mirrors Container: max-w-6xl with px-5 md:px-8. Outer rules are the column
  // bounds, inner rules are where content actually starts.
  return (
    <div data-devbar aria-hidden className="pointer-events-none fixed inset-0 z-70">
      <div className="mx-auto h-full w-full max-w-6xl border-x px-5 md:px-8" style={{ borderColor: TINT }}>
        <div className="h-full border-x" style={{ borderColor: TINT_SOFT }} />
      </div>
    </div>
  )
}
