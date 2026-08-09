import { isValidElement, type ReactNode } from 'react'
import { CopyCodeButton } from './copy-code-button'

const readText = (node: ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(readText).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) return readText(node.props.children)
  return ''
}

export default function Pre({ children, ...props }: React.ComponentProps<'pre'>) {
  return (
    <div className="group relative">
      <pre {...props} className={`${props.className || ''} pr-12`}>
        {children}
      </pre>
      <CopyCodeButton text={readText(children)} />
    </div>
  )
}
