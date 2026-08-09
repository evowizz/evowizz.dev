import { type HTMLAttributes } from 'react'
import { ArticleRuler } from '@/components/article-ruler'

export default function EnhancedArticle({ id = 'reader-article', ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <>
      <ArticleRuler articleId={id} />
      <article id={id} {...props} />
    </>
  )
}
