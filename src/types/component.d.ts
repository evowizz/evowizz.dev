import { PropsWithChildren, CSSProperties } from 'react'

export type StyleableProps<P = object> = P & {
  className?: string
  style?: CSSProperties
}

export type StyleablePropsWithChildren<P = object> = PropsWithChildren<StyleableProps<P>>

export type NoChildren<P = object> = P & { children?: never }
