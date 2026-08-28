'use client'

import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { MaterialSymbol } from './material-symbol'

type VideoProps = React.VideoHTMLAttributes<HTMLVideoElement>

export function Video({ className, controls, autoPlay, muted, preload, onPlay, onPause, ...props }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isDimmed, setIsDimmed] = useState(false)

  const handlePlayPause = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    if (isVideoPlaying) {
      video.pause()
    } else {
      void video.play().catch(() => {})
    }
  }, [isVideoPlaying])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (!autoPlay) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (reducedMotion.matches || !entry.isIntersecting) {
          video.pause()
          return
        }

        video.muted = true
        void video.play().catch(() => {})
      },
      { rootMargin: '200px 0px' },
    )

    const handleMotionPreference = () => {
      if (reducedMotion.matches) video.pause()
      else observer.observe(video)
    }

    reducedMotion.addEventListener('change', handleMotionPreference)
    observer.observe(video)

    return () => {
      reducedMotion.removeEventListener('change', handleMotionPreference)
      observer.disconnect()
    }
  }, [autoPlay])

  return (
    <div className="group relative">
      <video
        ref={videoRef}
        className={cn('rounded-xl', className)}
        onPlay={(e) => {
          setIsVideoPlaying(true)
          onPlay?.(e)
        }}
        onPause={(e) => {
          setIsVideoPlaying(false)
          onPause?.(e)
        }}
        {...props}
        controls={false}
        muted={autoPlay || muted}
        preload={preload ?? (autoPlay ? 'none' : 'metadata')}
        playsInline
        disablePictureInPicture
      >
        <p>Your browser doesn&apos;t support HTML5 video.</p>
      </video>

      <div
        className={cn(
          'pointer-events-none absolute inset-0 rounded-xl bg-black/50 transition-opacity duration-300',
          isDimmed ? 'opacity-100' : 'opacity-0',
        )}
        aria-hidden="true"
      />

      {(controls || autoPlay) && (
        <>
          <div className="motion-effects-default absolute top-2 right-2 opacity-20 transition-opacity group-hover:opacity-100 md:top-4 md:right-4">
            <DimButton active={isDimmed} onClick={() => setIsDimmed(!isDimmed)} />
          </div>

          <div className="absolute right-2 bottom-2 md:right-4 md:bottom-4">
            <PlayPauseButton playing={isVideoPlaying} onClick={handlePlayPause} />
          </div>
        </>
      )}
    </div>
  )
}

type PlayPauseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  playing: boolean
}

const PlayPauseButton = forwardRef<HTMLButtonElement, PlayPauseButtonProps>(({ className, playing, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        // Literal black on purpose: it sits on video frames, not on the
        // theme surface (same exception as the dimming overlay above).
        'flex size-10 items-center justify-center rounded-full bg-black text-white md:size-14',
        'opacity-100 hover:opacity-100 md:opacity-60',
        'motion-effects-default transition-opacity',
        className,
      )}
      role="switch"
      aria-checked={playing}
      aria-label={playing ? 'Pause video' : 'Play video'}
      {...props}
    >
      <MaterialSymbol name={playing ? 'pause' : 'play_arrow'} fill />
    </button>
  )
})

PlayPauseButton.displayName = 'PlayPauseButton'

type DimButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active: boolean
}

const DimButton = forwardRef<HTMLButtonElement, DimButtonProps>(({ className, active, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'bg-tertiary-container text-on-tertiary-container flex size-8 items-center justify-center rounded-full md:size-10',
        'opacity-100 hover:opacity-100 md:opacity-60',
        'motion-effects-default transition-opacity',
        className,
      )}
      role="switch"
      aria-checked={active}
      aria-label={active ? 'Disable dimming' : 'Enable dimming'}
      {...props}
    >
      <MaterialSymbol name={active ? 'light_mode' : 'contrast'} fill />
    </button>
  )
})

DimButton.displayName = 'DimButton'
