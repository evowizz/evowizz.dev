'use client'

import { useRef, useState } from 'react'
import { MaterialSymbol } from '@/components/material-symbol'
import { BarButton, Divider } from './bar-button'
import { cropRegion, type Selection } from './selection'

type SelectionToolbarProps = {
  selection: Selection
  onClear: () => void
}

export function SelectionToolbar({ selection, onClear }: SelectionToolbarProps) {
  const [done, setDone] = useState<'ref' | 'shot' | null>(null)
  const doneTimer = useRef(0)

  const flashDone = (kind: 'ref' | 'shot') => {
    setDone(kind)
    window.clearTimeout(doneTimer.current)
    doneTimer.current = window.setTimeout(() => setDone(null), 1200)
  }

  const label =
    selection.kind === 'element'
      ? selection.selector
      : `${Math.round(selection.width)}x${Math.round(selection.height)} (${selection.elements.length} ${selection.elements.length === 1 ? 'element' : 'elements'})`

  const copyRef = () => {
    const text =
      selection.kind === 'element'
        ? selection.selector
        : selection.elements.map((entry) => entry.selector).join('\n') || label
    navigator.clipboard
      .writeText(text)
      .then(() => flashDone('ref'))
      .catch((error) => console.error('[devbar] copy failed', error))
  }

  const copyShot = () => {
    const filter = (node: Node) =>
      !(
        node instanceof Element &&
        (node.hasAttribute('data-devbar') || node.id === 'react-scan-root' || node.tagName === 'NEXTJS-PORTAL')
      )
    // The pending blob goes into ClipboardItem directly so the clipboard
    // write stays within the click's transient user activation.
    const blob =
      selection.kind === 'element'
        ? import('html-to-image')
            .then(({ toBlob }) =>
              toBlob(selection.element as HTMLElement, {
                pixelRatio: window.devicePixelRatio,
                filter,
              }),
            )
            .then((result) => {
              if (!result) throw new Error('empty capture')
              return result
            })
        : import('html-to-image')
            .then(({ toCanvas }) => toCanvas(document.body, { pixelRatio: window.devicePixelRatio, filter }))
            .then((canvas) => cropRegion(canvas, selection))
    navigator.clipboard
      .write([new ClipboardItem({ 'image/png': blob })])
      .then(() => flashDone('shot'))
      .catch((error) => console.error('[devbar] screenshot failed', error))
  }

  return (
    <div
      data-devbar
      className="border-outline-variant bg-surface-container text-on-surface-variant fixed bottom-10 left-3 z-[85] flex items-center gap-1 rounded-lg border p-1 pl-2 font-mono text-[11px] tracking-[0.04em] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.10)] select-none dark:shadow-none"
    >
      <MaterialSymbol
        name={selection.kind === 'element' ? 'point_scan' : 'screenshot_region'}
        className="text-primary text-sm"
      />
      <span className="text-on-surface max-w-56 truncate" title={label}>
        {label}
      </span>
      <Divider />
      <BarButton onClick={copyRef} title="Copy element ref">
        <MaterialSymbol name={done === 'ref' ? 'check' : 'content_copy'} className="text-sm" />
        <span>Ref</span>
      </BarButton>
      <BarButton onClick={copyShot} title="Copy element screenshot">
        <MaterialSymbol name={done === 'shot' ? 'check' : 'photo_camera'} className="text-sm" />
        <span>Shot</span>
      </BarButton>
      <BarButton onClick={onClear} title="Clear selection">
        <MaterialSymbol name="close" className="text-sm" />
      </BarButton>
    </div>
  )
}
