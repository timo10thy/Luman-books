'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Book } from '@/lib/data'

export default function LiveSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([])
      return
    }

    setLoading(true)
    const timeout = setTimeout(() => {
      fetch(`/api/books?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data.books)
          setLoading(false)
        })
    }, 300)

    return () => clearTimeout(timeout)
  }, [query])

  return (
    <div className="relative max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search books or authors..."
        className="w-full px-4 py-2.5 border border-ink/15 rounded-lg text-sm focus:outline-none focus:border-gold bg-white"
      />

      {query.trim().length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-ink/10 rounded-lg shadow-lg max-h-72 overflow-y-auto">
          {loading ? (
            <p className="px-4 py-3 text-sm text-ink/50">Searching...</p>
          ) : results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-ink/50">No books found.</p>
          ) : (
            results.map((book) => (
              <Link
                key={book.slug}
                href={`/books/${book.slug}`}
                className="block px-4 py-2.5 hover:bg-cream transition-colors border-b border-ink/5 last:border-0"
              >
                <p className="text-sm font-medium text-ink">{book.title}</p>
                <p className="text-xs text-ink/50">{book.author}</p>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  )
}