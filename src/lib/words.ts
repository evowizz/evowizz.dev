/** Rough word count for raw MDX content: ignores code blocks and markup. */
export function countWords(markdown: string): number {
  const text = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
  return text.split(/\s+/).filter(Boolean).length
}

/** Formats a word count the way a manual would: 3600 -> "3.6K". */
export function formatWords(count: number): string {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}K` : `${count}`
}
