import { getBookBySlug, getBooks } from '@/lib/data'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import type { Book } from '@/lib/data'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const books = await getBooks()
  return books.map((book) => ({
    slug: book.slug,
  }))
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const book = await getBookBySlug(slug)

  if (!book) {
    return {
      title: 'Book Not Found — Lumen Books',
    }
  }

  return {
    title: `${book.title} — Lumen Books`,
    description: book.description,
    openGraph: {
      title: book.title,
      description: book.description,
      images: [book.coverImageUrl],
    },
  }
}


async function Recommended({ currentSlug }: { currentSlug: string }) {
 
  await new Promise((r) => setTimeout(r, 1200))

  const allBooks = await getBooks()
  const recommended = allBooks
    .filter((b) => b.slug !== currentSlug)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {recommended.map((book) => (
        <Link
          key={book.slug}
          href={`/books/${book.slug}`}
          className="group bg-white rounded-xl border border-ink/8 overflow-hidden hover:shadow-md transition-shadow duration-200"
        >
          <div className="relative h-32 w-full bg-cream">
            <Image
              src={book.coverImageUrl}
              alt={book.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-3">
            <p className="text-sm font-medium text-ink group-hover:text-gold transition-colors line-clamp-1">
              {book.title}
            </p>
            <p className="text-xs text-ink/50 mt-0.5">{book.author}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}


function RecommendedSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-ink/8 overflow-hidden animate-pulse"
        >
          <div className="h-32 w-full bg-ink/5" />
          <div className="p-3 space-y-2">
            <div className="h-3 w-3/4 bg-ink/10 rounded" />
            <div className="h-3 w-1/2 bg-ink/10 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function BookDetailPage({ params }: PageProps) {
  const { slug } = await params
  const book = await getBookBySlug(slug)

  if (!book) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Main book info */}
        <div className="flex flex-col sm:flex-row gap-8 pb-10 border-b border-ink/10">
          {/* Cover */}
          <div className="relative h-80 w-56 flex-shrink-0 bg-white rounded-xl overflow-hidden mx-auto sm:mx-0">
            <Image
              src={book.coverImageUrl}
              alt={book.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Details */}
          <div className="flex-1">
            <span className="text-xs font-medium uppercase tracking-widest text-gold">
              {book.category}
            </span>
            <h1 className="mt-1 font-playfair text-3xl font-bold text-ink leading-tight">
              {book.title}
            </h1>
            <p className="mt-1 text-ink/60">{book.author}</p>
            <p className="mt-2 text-sm text-ink/50">
              ⭐ {book.ratingsCount.toLocaleString()} ratings
            </p>
            <p className="mt-5 text-ink/70 leading-relaxed">{book.description}</p>
            <div className="mt-6 flex items-center gap-4">
              <span className="text-2xl font-semibold text-ink">
                ₦{book.price.toFixed(2)}
              </span>
              <button className="px-6 py-2.5 bg-gold text-ink rounded-lg text-sm font-medium hover:bg-gold/90 transition-colors">
                Add to cart
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10">
          <h2 className="font-playfair text-xl font-semibold text-ink mb-5">
            Recommended for you
          </h2>
          <Suspense fallback={<RecommendedSkeleton />}>
            <Recommended currentSlug={book.slug} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}