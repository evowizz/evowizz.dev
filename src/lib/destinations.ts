export const destinations = [
  { label: 'Home', path: '/' },
  { label: 'Blog', path: '/blog' },
]

export type Destination = (typeof destinations)[number]
