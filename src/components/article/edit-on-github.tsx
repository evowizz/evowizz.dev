import Link from 'next/link'
import { MaterialSymbol } from '@/components/ui/material-symbol'

const REPO_URL = 'https://github.com/evowizz/evowizz.dev'
const BRANCH = 'next'

type EditOnGitHubProps = {
  filePath: string
}

export function EditOnGitHub({ filePath }: EditOnGitHubProps) {
  const editUrl = `${REPO_URL}/edit/${BRANCH}/${filePath}`

  return (
    <section className="flex justify-end pr-4">
      <Link
        href={editUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-on-surface-variant hover:text-primary focus-ring inline-flex items-center gap-2 text-sm transition-colors"
      >
        <MaterialSymbol name="edit" className="text-lg" />
        Edit on GitHub
      </Link>
    </section>
  )
}
