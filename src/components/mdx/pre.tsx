'use client'

import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import { MaterialSymbol } from '@/components/material-symbol'

export default function Pre({ children, ...props }: React.ComponentProps<'pre'>) {
  const preRef = useRef<HTMLPreElement>(null)
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    if (!preRef.current) return
    const text = preRef.current.textContent || ''

    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="group relative">
      <pre ref={preRef} {...props} className={`${props.className || ''} pr-12`}>
        {children}
      </pre>
      <button
        onClick={copyToClipboard}
        className={cn(
          'motion-effects-default absolute top-4 right-4 flex size-8 items-center justify-center rounded-lg border transition-colors',
          'opacity-0 group-hover:opacity-100 focus:opacity-100',
          isCopied
            ? 'border-tertiary bg-tertiary-container text-on-tertiary-container'
            : 'border-outline-variant bg-surface-container-highest text-on-surface-variant hover:bg-surface-container hover:border-outline',
        )}
        aria-label="Copy code"
      >
        {isCopied ? (
          <MaterialSymbol
            name="check"
            className="motion-effects-slow group-hover:symbol-weight-700 text-base"
          />
        ) : (
          <MaterialSymbol name="content_copy" className="text-base" />
        )}
      </button>
    </div>
  )
}
