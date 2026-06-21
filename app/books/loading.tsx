function SkeletonCard() {
  return (
    <div className="flex gap-4 bg-white rounded-xl border border-ink/8 p-4 animate-pulse">
      <div className="h-32 w-24 flex-shrink-0 bg-ink/5 rounded-lg" />
      <div className="flex-1 space-y-2 py-1">
        <div className="h-3 w-16 bg-ink/10 rounded" />
        <div className="h-4 w-3/4 bg-ink/10 rounded" />
        <div className="h-3 w-1/3 bg-ink/10 rounded" />
        <div className="h-3 w-full bg-ink/10 rounded mt-2" />
      </div>
    </div>
  )
}

export default function BooksLoading() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="h-3 w-20 bg-ink/10 rounded mb-2" />
          <div className="h-9 w-48 bg-ink/10 rounded" />
        </div>
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </main>
  )
}