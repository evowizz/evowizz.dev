import { useEffect, useState } from 'react'

/** Boolean tool state mirrored onto <html> so the rules can live in globals.css. */
export const useRootFlag = (attribute: string) => {
  const [on, setOn] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    if (on) root.setAttribute(attribute, '')
    else root.removeAttribute(attribute)
    return () => root.removeAttribute(attribute)
  }, [on, attribute])

  return [on, setOn] as const
}
