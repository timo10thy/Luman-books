import Link from 'next/link';
import { getBooks } from '@/lib/data';
import { ListBookCard } from '../components/BookCard';


const CATEGORIES = ['All', 'Fiction', 'Non-Fiction', 'History', 'Science'];
const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
];


interface BooksPageProps {
  searchParams: Promise<{
    category?: string;
    sort?: string;
  }>;
}

export default async function BooksPage({ searchParams }: BooksPageProps) {

  const { category, sort } = await searchParams;

  const allBooks = await getBooks();

  // Filter by category
  const filtered =
    !category || category === 'All'
      ? allBooks
      : allBooks.filter((b) => b.category === category);

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price_asc') return a.price - b.price;
    if (sort === 'price_desc') return b.price - a.price;
    // Default: newest (by createdAt descending)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const activeCategory = category || 'All';
  const activeSort = sort || 'newest';

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-widest text-gold mb-1">
            Catalogue
          </p>
          <h1 className="font-playfair text-4xl font-bold text-ink">All Books</h1>
          <p className="mt-2 text-ink/50 text-sm">
            {sorted.length} {sorted.length === 1 ? 'book' : 'books'} found
            {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/books?category=${cat}&sort=${activeSort}`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  activeCategory === cat
                    ? 'bg-gold text-white border-gold'
                    : 'bg-white border-ink/10 text-ink/70 hover:border-gold hover:text-gold'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Sort filter */}
          <div className="sm:ml-auto flex gap-2 flex-wrap">
            {SORT_OPTIONS.map((opt) => (
              <Link
                key={opt.value}
                href={`/books?category=${activeCategory}&sort=${opt.value}`}
                className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                  activeSort === opt.value
                    ? 'bg-ink text-cream border-ink'
                    : 'bg-white border-ink/10 text-ink/70 hover:border-ink hover:text-ink'
                }`}
              >
                {opt.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Book list */}
        {sorted.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-4xl mb-4">📭</p>
            <p className="font-playfair text-xl text-ink">No books found</p>
            <p className="text-ink/50 text-sm mt-2">Try a different category or sort.</p>
            <Link
              href="/books"
              className="mt-6 inline-block px-5 py-2.5 bg-ink text-cream rounded-lg text-sm hover:bg-ink/80 transition-colors"
            >
              Clear filters
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {sorted.map((book) => (
              <ListBookCard key={`book-${book.slug}`} book={book} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}