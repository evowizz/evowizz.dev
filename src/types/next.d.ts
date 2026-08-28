/**
 * Types a Next.js page's props from the shape of its route params.
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
