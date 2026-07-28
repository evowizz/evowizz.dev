'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { scan, setOptions } from 'react-scan'
import { cn } from '@/lib/utils'
import { useIsSSR } from '@/lib/use-is-ssr'
import { MaterialSymbol } from '@/components/material-symbol'
import { BarButton, Divider } from './bar-button'
import { DebugMenu } from './debug-menu'
import { SelectionToolbar } from './selection-toolbar'
import { useSelection } from './use-selection'

const BREAKPOINTS: Array<[string, number]> = [
  ['2xl', 1536],
  ['xl', 1280],
  ['lg', 1024],
  ['md', 768],
  ['sm', 640],
]

const breakpointFor = (width: number) => BREAKPOINTS.find(([, min]) => width >= min)?.[0] ?? 'base'

const THEMES = [
  { value: 'light', icon: 'light_mode', label: 'Day' },
  { value: 'dark', icon: 'dark_mode', label: 'Night' },
  { value: 'system', icon: 'routine', label: 'System' },
] as const

/**
 * Development toolbar pinned to the bottom edge. Live values (viewport, fps)
 * are written straight to the DOM so the bar itself never re-renders while
 * measuring.
 */
export function DevBar() {
  const { theme, setTheme } = useTheme()
  const isSSR = useIsSSR()
  const [dismissed, setDismissed] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [fpsOn, setFpsOn] = useState(false)
  const [debugOpen, setDebugOpen] = useState(false)
  const { picking, setPicking, selected, setSelected } = useSelection(!dismissed)
  const breakpointRef = useRef<HTMLSpanElement>(null)
  const sizeRef = useRef<HTMLSpanElement>(null)
  const fpsRef = useRef<HTMLSpanElement>(null)

  // The persisted theme is only known on the client; render the system icon
  // until mounted so hydration sees the same markup as the server.
  const themeIndex = isSSR ? -1 : THEMES.findIndex((entry) => entry.value === theme)
  const currentTheme = THEMES[themeIndex === -1 ? 2 : themeIndex]
  const nextTheme = THEMES[(THEMES.indexOf(currentTheme) + 1) % THEMES.length]

  useEffect(() => {
    if (dismissed) return

    const measure = () => {
      if (breakpointRef.current) {
        breakpointRef.current.textContent = breakpointFor(window.innerWidth)
      }
      if (sizeRef.current) {
        sizeRef.current.textContent = `${window.innerWidth}x${window.innerHeight}`
      }
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [dismissed])

  useEffect(() => {
    if (dismissed || !fpsOn) return

    let frames = 0
    let raf = 0
    let windowStart = performance.now()
    const tick = (t: number) => {
      frames += 1
      if (t - windowStart >= 500) {
        if (fpsRef.current) {
          fpsRef.current.textContent = `${Math.round((frames * 1000) / (t - windowStart))}`
        }
        frames = 0
        windowStart = t
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [dismissed, fpsOn])

  // Layout sets this on <html> so the reserve is already in the server markup;
  // this keeps it in sync once the bar can be dismissed.
  useEffect(() => {
    const root = document.documentElement
    if (dismissed) root.removeAttribute('data-devbar-visible')
    else root.setAttribute('data-devbar-visible', '')
  }, [dismissed])

  useEffect(() => {
    if (!scanning) return

    // react-scan persists its options; clearing them keeps this toggle
    // authoritative over whatever its own toolbar saved last.
    localStorage.removeItem('react-scan-options')
    scan({ enabled: true, showToolbar: true })

    return () => {
      localStorage.removeItem('react-scan-options')
      setOptions({ enabled: false, showToolbar: false })
    }
  }, [scanning])

  if (dismissed) return null

  return (
    <>
      <div
        data-devbar
        inert={!debugOpen}
        className={cn(
          'border-outline-variant bg-surface-container fixed right-3 bottom-10 z-[85] max-h-[70vh] w-80 overflow-y-auto rounded-3xl border shadow-xl',
          'motion-spatial-fast origin-bottom-right transition-[transform,opacity]',
          debugOpen
            ? 'translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-3 scale-90 opacity-0',
        )}
      >
        <DebugMenu />
      </div>

      {selected && <SelectionToolbar selection={selected} onClear={() => setSelected(null)} />}

      <div
        data-devbar
        className="border-outline-variant bg-surface-container text-on-surface-variant fixed inset-x-0 bottom-0 z-[80] flex h-[var(--devbar-h)] items-center justify-between overflow-hidden border-t px-3 font-mono text-[11px] tracking-[0.04em] whitespace-nowrap select-none sm:px-5"
      >
        <div className="flex items-center">
          <span className="text-primary uppercase">Dev</span>
          <Divider />
          <BarButton
            onClick={() => setTheme(nextTheme.value)}
            title={`Theme: ${currentTheme.label} (next: ${nextTheme.label})`}
          >
            <MaterialSymbol name={currentTheme.icon} className="text-sm" />
          </BarButton>
          <Divider />
          {/* The breakpoint stays at every width; the exact size is the part that
              gets dropped when there is no room for it. */}
          <span className="flex items-center gap-1.5">
            <span ref={breakpointRef} />
            <span ref={sizeRef} className="hidden sm:inline" />
          </span>
        </div>

        <div className="flex items-center gap-1">
          <BarButton
            onClick={() => {
              setSelected(null)
              setPicking((value) => !value)
            }}
            title="Select an element or region"
            active={picking}
          >
            <MaterialSymbol name="point_scan" className="text-sm" />
            <span className="hidden sm:inline">Select</span>
          </BarButton>
          <BarButton
            onClick={() => setScanning((value) => !value)}
            title="Toggle React Scan"
            active={scanning}
          >
            <MaterialSymbol name="radar" className="text-sm" />
            <span className="hidden sm:inline">Scan</span>
          </BarButton>
          <BarButton
            onClick={() => setFpsOn((value) => !value)}
            title="Toggle FPS counter"
            active={fpsOn}
          >
            <MaterialSymbol name="speed" className="text-sm" />
            {fpsOn ? (
              <>
                <span ref={fpsRef} className="min-w-[3ch] text-right" />
                <span className="hidden sm:inline">FPS</span>
              </>
            ) : (
              <span className="hidden sm:inline">Show FPS</span>
            )}
          </BarButton>
          <Divider />
          <BarButton
            onClick={() => setDebugOpen((value) => !value)}
            title="Toggle theme debug panel"
            active={debugOpen}
          >
            <MaterialSymbol name="shapes" className="text-sm" />
          </BarButton>
          <BarButton onClick={() => setDismissed(true)} title="Dismiss dev bar">
            <MaterialSymbol name="close" className="text-sm" />
          </BarButton>
        </div>
      </div>
    </>
  )
}
