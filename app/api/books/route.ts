import { NextRequest, NextResponse } from 'next/server'
import { getBooks } from '@/lib/data'

export async function GET(request: NextRequest) {
  const books = await getBooks()

  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')?.toLowerCase() || ''

  const filtered = query
    ? books.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
      )
    : books

  return NextResponse.json({ books: filtered })
}