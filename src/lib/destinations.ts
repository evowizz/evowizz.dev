export const destinations = [
  { label: 'Home', path: '/' },
  { label: 'Blog', path: '/blog' },
  { label: 'Focus', path: '/focus' },
]

export type Destination = (typeof destinations)[number]
