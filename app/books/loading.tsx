export default function BooksLoading() {
    return (
      <main className="min-h-screen bg-cream">
        <div className="max-w-4xl mx-auto px-6 py-12">
  
          {/* Header*/}
          <div className="mb-8">
            <div className="h-3 w-20 bg-ink/10 rounded-full mb-3 animate-pulse" />
            <div className="h-9 w-40 bg-ink/10 rounded-lg animate-pulse" />
            <div className="h-3 w-28 bg-ink/10 rounded-full mt-3 animate-pulse" />
          </div>
  
          {/* Filter */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-8 w-20 bg-ink/10 rounded-full animate-pulse"
              />
            ))}
          </div>
  
          {/* Book card */}
          <div className="flex flex-col gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex gap-4 bg-white rounded-xl border border-ink/8 p-4"
              >
                {/* Cover */}
                <div className="w-20 h-28 shrink-0 rounded-md bg-ink/10 animate-pulse" />
  
                {/* Info*/}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="h-2.5 w-16 bg-ink/10 rounded-full animate-pulse" />
                    <div className="h-5 w-48 bg-ink/10 rounded-lg mt-2 animate-pulse" />
                    <div className="h-3 w-24 bg-ink/10 rounded-full mt-2 animate-pulse" />
                    <div className="h-3 w-full bg-ink/10 rounded-full mt-3 animate-pulse" />
                    <div className="h-3 w-3/4 bg-ink/10 rounded-full mt-2 animate-pulse" />
                  </div>
                  <div className="flex justify-between mt-3">
                    <div className="h-4 w-16 bg-ink/10 rounded-full animate-pulse" />
                    <div className="h-4 w-24 bg-ink/10 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
  
        </div>
      </main>
    );
  }