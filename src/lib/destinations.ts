export const destinations = [
  { label: 'Home', path: '/' },
  { label: 'Blog', path: '/blog' },
  { label: 'Writeups', path: '/writeups' },
]

export type Destination = (typeof destinations)[number]
