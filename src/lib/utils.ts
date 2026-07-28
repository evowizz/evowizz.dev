import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Helper function to make it easy to conditionally apply classes.
 *
 * Credits to shadcn:
 * https://ui.shadcn.com/docs/installation/manual
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Creates a debounced function that delays invoking the provided function
 * until after a specified wait time has passed since the last invocation.
 *
 * If the function is called again before the wait time has elapsed,
 * the previous invocation is canceled and a new timer is started.
 */
export function debounce<A extends unknown[], R>(func: (...args: A) => R, waitFor: number): (...args: A) => void {
  let timeoutId: NodeJS.Timeout | null = null

  return (...args: A): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func(...args)
    }, waitFor)
  }
}
