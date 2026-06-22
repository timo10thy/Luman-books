import Link from 'next/link';
import { getBooks } from '@/lib/data';
import { GridBookCard } from './components/BookCard';
import LiveSearch from './components/LiveSearch'

export const revalidate = 3600;

export default async function HomePage() {
  const books = await getBooks();
  const featured = books.slice(0, 3);
  const genres = [...new Set(books.map((b) => b.category))];

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-gold mb-4">
          Curated Reading
        </p>
        <h1 className="font-playfair text-5xl md:text-6xl font-bold text-ink leading-tight">
          Books that stay <br />
          <span className="text-gold italic">with you.</span>
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-ink/60 text-lg leading-relaxed">
          A hand-picked collection across fiction, history, science, and ideas.
          Find your next great read.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/books"
            className="px-6 py-3 bg-ink text-cream rounded-lg text-sm font-medium hover:bg-ink/80 transition-colors"
          >
            Browse All Books
          </Link>
          <Link
            href="/books?category=Fiction"
            className="px-6 py-3 border border-ink/20 text-ink rounded-lg text-sm font-medium hover:bg-ink/5 transition-colors"
          >
            Start with Fiction
          </Link>
          
        </div>
        
        <div className="mt-8">
          <LiveSearch />
        </div>  


      </section>

      {/* Genre pills */}
      <section className="max-w-6xl mx-auto px-6 pb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {genres.map((genre) => (
            <Link
              key={`genre-${genre}`}
              href={`/books?category=${genre}`}
              className="px-4 py-1.5 rounded-full bg-white border border-ink/10 text-sm text-ink/70 hover:border-gold hover:text-gold transition-colors"
            >
              {genre}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Books */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-playfair text-2xl font-semibold text-ink">
            Featured Titles
          </h2>
          <Link
            href="/books"
            className="text-sm text-gold hover:underline underline-offset-2"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((book) => (
            <GridBookCard key={`featured-${book.slug}`} book={book} />
          ))}
        </div>
      </section>

      {/* Footer strip */}
      <footer className="border-t border-ink/10 py-8 text-center text-sm text-ink/40">
        © {new Date().getFullYear()} Lumen Books. All rights reserved.
      </footer>
    </main>
  );
}