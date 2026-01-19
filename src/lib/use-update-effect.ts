import { useEffect, useRef, type DependencyList, type EffectCallback } from 'react'

/**
 * A useEffect that skips the initial mount and only runs on updates.
 */
export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList): void {
  const isFirstMount = useRef(true)

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }

    return effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
