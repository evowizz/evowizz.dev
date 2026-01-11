import { ComponentProps } from 'react'

type ViewCounterProps = {
  count: number
} & ComponentProps<'span'>

export const ViewCounter = ({ count, ...props }: ViewCounterProps) => {
  if (!count) return null

  return (
    <span {...props} suppressHydrationWarning>
      {`${count.toLocaleString()} views`}
    </span>
  )
}
