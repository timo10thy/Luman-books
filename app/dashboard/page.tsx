import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getBooks } from '@/lib/data'
import { AUTH_COOKIE_NAME } from '@/lib/auth'

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get(AUTH_COOKIE_NAME)

  if (!session) {
    redirect('/login')
  }

  
  const books = await getBooks()

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-gold mb-1">
              Seller dashboard
            </p>
            <h1 className="font-playfair text-3xl font-bold text-ink">
              Your listings
            </h1>
            <p className="mt-2 text-ink/50 text-sm">
              {books.length} {books.length === 1 ? 'book' : 'books'} listed
            </p>
          </div>
          <Link
            href="/dashboard/new"
            className="px-5 py-2.5 bg-gold text-ink rounded-lg text-sm font-medium hover:bg-gold/90 transition-colors"
          >
            + Add book
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-ink/8 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/8 text-left text-ink/50">
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Ratings</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.slug} className="border-b border-ink/5 last:border-0">
                  <td className="px-5 py-3 font-medium text-ink">{book.title}</td>
                  <td className="px-5 py-3 text-ink/60">{book.category}</td>
                  <td className="px-5 py-3 text-ink/60">₦{book.price.toFixed(2)}</td>
                  <td className="px-5 py-3 text-ink/60">{book.ratingsCount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}