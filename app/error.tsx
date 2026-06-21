'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-playfair text-5xl font-bold text-ink/20 mb-4">⚠</p>
        <h1 className="font-playfair text-2xl font-semibold text-ink mb-3">
          Something went wrong
        </h1>
        <p className="text-ink/60 text-sm leading-relaxed mb-8">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-gold text-ink rounded-lg text-sm font-medium hover:bg-gold/90 transition-colors"
        >
          Try again
        </button>
      </div>
    </main>
  )
}