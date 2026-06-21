import Image from 'next/image'
import Link from 'next/link'
import { Book } from '@/lib/data'

export function GridBookCard({ book }: { book: Book }) {
    return (
      <Link
        href={`/books/${book.slug}`}
        className="group block bg-white rounded-xl overflow-hidden border border-ink/8 shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <div className="relative h-52 w-full bg-cream">
          <Image
            src={book.coverImageUrl}
            alt={book.title}
            fill
            className="object-cover"
          />
        </div>
  
        <div className="p-5">
          <span className="text-xs font-medium uppercase tracking-widest text-gold">
            {book.category}
          </span>
          <h3 className="mt-1 font-playfair text-lg font-semibold text-ink leading-snug group-hover:text-gold transition-colors">
            {book.title}
          </h3>
          <p className="mt-1 text-sm text-ink/60">{book.author}</p>
          <p className="mt-3 text-sm text-ink/70 line-clamp-2">{book.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-base font-semibold text-ink">₦{book.price.toFixed(2)}</span>
          </div>
        </div>
      </Link>
    )
  }
export function ListBookCard({ book }: { book: Book }) {
  return (
    <Link href={`/books/${book.slug}`} 
    className="group flex gap-4 bg-white rounded-xl border border-ink/8 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="relative h-32 w-24 shrink-0 bg-cream rounded-lg overflow-hidden">
            <Image
                src={book.coverImageUrl}
                alt={book.title}
                fill
                className="object-cover"
            />   
                
        </div>

        <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <span className="text-xs font-medium uppercase tracking-widest text-gold">
            {book.category}
          </span>
          <h2 className="mt-0.5 font-playfair text-base font-semibold text-ink leading-snug group-hover:text-gold transition-colors line-clamp-2">
            {book.title}
          </h2>
          <p className="text-sm text-ink/50 mt-0.5">{book.author}</p>
          <p className="mt-2 text-sm text-ink/60 line-clamp-2">{book.description}</p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-semibold text-ink">₦{book.price.toFixed(2)}</span>
          <span className="text-xs text-ink/40">⭐ {book.ratingsCount.toLocaleString()} ratings</span>
        </div>
      </div>
    </Link>
  )
}