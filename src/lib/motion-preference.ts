import gsap from 'gsap'

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Runs `full` or `reduce` for the current preference, reverting and re-running
 * them if the system setting changes. `reduce` should land the finished visual
 * state rather than doing nothing, so whichever branch ran first, the element
 * ends up correct.
 */
export const withMotionPreference = (full: () => void, reduce?: () => void) => {
  const mm = gsap.matchMedia()
  mm.add('(prefers-reduced-motion: no-preference)', full)
  if (reduce) mm.add('(prefers-reduced-motion: reduce)', reduce)
  return () => mm.revert()
}
