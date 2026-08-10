import { type HTMLAttributes } from 'react'
import { ArticleRuler } from './article-ruler'

export function ArticleWithRuler({ id = 'reader-article', ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <>
      <ArticleRuler articleId={id} />
      <article id={id} {...props} />
    </>
  )
}
