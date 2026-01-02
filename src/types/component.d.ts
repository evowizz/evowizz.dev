import { PropsWithChildren, CSSProperties } from 'react'

export type StyleableProps<P = {}> = P & {
  className?: string
  style?: CSSProperties
}

export type StyleablePropsWithChildren<P = {}> = PropsWithChildren<StyleableProps<P>>

export type NoChildren<P = {}> = P & { children?: never }
