import { ComponentProps } from 'react'

type ViewCounterProps = {
  allViews: { slug: string; count: number }[]
  slug: string
} & ComponentProps<'span'>

export const ViewCounter = ({ allViews, slug, ...props }: ViewCounterProps) => {
  const views = allViews && allViews.find((v) => v.slug === slug)
  const viewsCounts = new Number(views?.count || 0)

  return (
    <span {...props} suppressHydrationWarning>
      {`${viewsCounts.toLocaleString()} views`}
    </span>
  )
}
