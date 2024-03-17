/**
 * Helper for Next.js pages to easily support page params.
 * 
 * Usage:
 * ```
 * type MyPageProps = {
 *   slug: string
 * }
 *
 *  export default function MyPage({ params }: NextPage<MyPageProps>)
 * ```
 */
export type NextPage<P = unknown> = { params: P }