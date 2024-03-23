import { cn } from '@/lib/utils'

type BlobBackgroundProps = {
  className?: string
}

export const BlobBackground = (props: BlobBackgroundProps) => {
  return (
    <>
      <div
        className={cn(
          'fixed inset-0 blur-3xl flex items-center justify-center',
          props.className,
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full"
          fill="none"
          viewBox="0 0 200 200"
        >
          <path
            className="fill-current text-red-800"
            fill-rule="evenodd"
            d="M45.876 152.329c15.952 16.471 53.091 6.378 82.953-22.544 17.168-16.627 28.193-35.858 31.432-52.333-4.318 11.602-12.784 24.38-24.567 35.878-24.805 24.205-54.916 33.576-67.256 20.931-12.34-12.646-2.235-42.519 22.57-66.724 17.225-16.808 37.009-26.464 51.624-26.56-18.617-5.26-47.465 5.817-71.57 29.163-29.862 28.921-41.138 65.72-25.186 82.19Z"
          />
        </svg>
      </div>
      {/* Noise */}
      <div className="absolute inset-0 overlay-noise" />
    </>
  )
}
