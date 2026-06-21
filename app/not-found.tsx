import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-playfair text-7xl font-bold text-gold mb-2">404</p>
        <h1 className="font-playfair text-2xl font-semibold text-ink mb-3">
          Page not found
        </h1>
        <p className="text-ink/60 text-sm leading-relaxed mb-8">
          The book or page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-ink text-cream rounded-lg text-sm font-medium hover:bg-ink/80 transition-colors"
        >
          Back to home
        </Link>
      </div>
    </main>
  )
}