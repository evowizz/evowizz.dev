import { EmbeddedTweet, TweetNotFound } from 'react-tweet'
import { getTweet } from '@/lib/tweet'

export async function Tweet({ id }: { id: string }) {
  const tweet = id ? await getTweet(id) : undefined

  return (
    <div className="not-prose my-8 flex justify-center">
      {tweet ? <EmbeddedTweet tweet={tweet} /> : <TweetNotFound />}
    </div>
  )
}
