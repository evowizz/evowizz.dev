import { type ReactNode } from 'react'

export const MicroLabel = ({ children }: { children: ReactNode }) => (
  <span className="text-on-surface-variant text-[10px] font-medium tracking-[0.08em] uppercase">{children}</span>
)
