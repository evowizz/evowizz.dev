import { cacheLife } from 'next/cache'
import { fetchTweet, type Tweet } from 'react-tweet/api'
import { deleteTweet, saveTweet } from '@/db/tweets/actions'
import { readTweet } from '@/db/tweets/queries'

export async function getTweet(id: string): Promise<Tweet | undefined> {
  'use cache'
  cacheLife('max')

  try {
    const { data, tombstone, notFound } = await fetchTweet(id)

    if (data) {
      await saveTweet(id, data)
      return data
    }
    if (tombstone || notFound) {
      await deleteTweet(id)
      return undefined
    }
  } catch {}

  return readTweet(id)
}
