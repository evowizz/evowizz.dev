import { cn } from '@/lib/utils'
import Link from 'next/link'

type DrawerFooterProps = {
  className?: string
}

export const DrawerFooter = ({ className }: DrawerFooterProps) => (
  <div className={cn('flex flex-col gap-8 pt-8', className)}>
    <div className="flex flex-col gap-2 text-base text-ellipsis text-wrap">
      <p>Find me</p>
      <div className="grid grid-cols-3 gap-1">
        <SocialLink href="mailto:mail@evowizz.dev">Email</SocialLink>
        <SocialLink href="https://t.me/evowizz">Telegram</SocialLink>
        <SocialLink href="https://github.com/evowizz">GitHub</SocialLink>
        <SocialLink href="https://twitter.com/evowizz" title="What even is 'X'">Twitter</SocialLink>
        <SocialLink href="https://bsky.app/profile/evo.bsky.social">Bluesky</SocialLink>
        <SocialLink href="https://androiddev.social/@evo">Mastodon</SocialLink>
        <SocialLink href="https://www.threads.net/@evowizz">Threads</SocialLink>
      </div>
    </div>

    {/* Inspired by Google Design (with Link) */}
    <p className="text-sm">
      Inspired by{' '}
      <Link href="https://design.google" className="text-accent">
        Google Design
      </Link>
      .
    </p>
  </div>
)

type LinkProps = React.ComponentPropsWithRef<typeof Link>

const SocialLink: React.FC<LinkProps> = ({ className, ...props }) => (
  <div>
    <Link
      {...props}
      className={cn(
        'underline text-foreground-inv/80 transition-all',
        'hover:text-accent',
        className,
      )}
    />
  </div>
)
