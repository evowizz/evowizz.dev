import { useEffect } from 'react'

export const useScrollLock = (shouldLock: boolean) => {
  useEffect(() => {
    if (!shouldLock) return

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    document.body.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`)
    document.body.setAttribute('data-scroll-locked', 'true')

    return () => {
      document.body.style.removeProperty('--scrollbar-width')
      document.body.removeAttribute('data-scroll-locked')
    }
  }, [shouldLock])
}
