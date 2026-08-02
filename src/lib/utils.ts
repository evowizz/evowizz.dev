import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges class names, with later Tailwind utilities winning any conflict.
 *
 * Credits to shadcn:
 * https://ui.shadcn.com/docs/installation/manual
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Runs `func` once the calls stop for `waitFor` ms. Each new call cancels the pending one. */
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
