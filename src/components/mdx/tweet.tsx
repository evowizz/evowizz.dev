import Image from 'next/image'
import { EmbeddedTweet, TweetNotFound, type TwitterComponents } from 'react-tweet'
import { getTweet } from '@/lib/tweet'

const components: TwitterComponents = {
  AvatarImg: (props) => <Image {...props} />,
  MediaImg: (props) => <Image {...props} fill unoptimized />,
}

export async function Tweet({ id }: { id: string }) {
  const tweet = id ? await getTweet(id) : undefined

  return (
    <div className="not-prose my-8 flex justify-center">
      {tweet ? <EmbeddedTweet tweet={tweet} components={components} /> : <TweetNotFound />}
    </div>
  )
}
