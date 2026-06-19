export interface Book {
  id: number
  slug: string
  title: string
  author: string
  price: number
  description: string
  coverImageUrl: string
  category: string
  createdAt: string
  ratingsCount: number
}

const books: Book[] = [
  {
    id: 1,
    slug: "the-midnight-library",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 14.99,
    description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    coverImageUrl: "/covers/the-midnight-library.jpg",
    category: "Fiction",
    createdAt: "2020-08-13",
    ratingsCount: 4872,
  },
  {
    id: 2,
    slug: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    price: 16.99,
    description: "An easy and proven way to build good habits and break bad ones. Tiny changes, remarkable results.",
    coverImageUrl: "/covers/atomic-habits.jpg",
    category: "Non-Fiction",
    createdAt: "2018-10-16",
    ratingsCount: 9241,
  },
  {
    id: 3,
    slug: "sapiens",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 18.99,
    description: "A brief history of humankind, from the Stone Age to the present, exploring how Homo sapiens came to dominate the earth.",
    coverImageUrl: "/covers/sapiens.jpg",
    category: "History",
    createdAt: "2011-01-01",
    ratingsCount: 7653,
  },
  {
    id: 4,
    slug: "a-brief-history-of-time",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    price: 12.99,
    description: "A landmark volume in science writing that explores the nature of space, time, and the universe.",
    coverImageUrl: "/covers/a-brief-history-of-time.jpg",
    category: "Science",
    createdAt: "1988-04-01",
    ratingsCount: 6120,
  },
  {
    id: 5,
    slug: "to-kill-a-mockingbird",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 13.99,
    description: "A gripping tale of racial injustice and childhood innocence set in the American South during the 1930s.",
    coverImageUrl: "/covers/to-kill-a-mockingbird.jpg",
    category: "Fiction",
    createdAt: "1960-07-11",
    ratingsCount: 8934,
  },
  {
    id: 6,
    slug: "the-alchemist",
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 11.99,
    description: "A magical story about Santiago, an Andalusian shepherd boy who journeys to the Egyptian pyramids in search of treasure.",
    coverImageUrl: "/covers/the-alchemist.jpg",
    category: "Fiction",
    createdAt: "1988-01-01",
    ratingsCount: 5431,
  },
]

export async function getBooks(): Promise<Book[]> {
  await new Promise(r => setTimeout(r, 500))
  return books
}

export async function getBookBySlug(slug: string): Promise<Book | undefined> {
  await new Promise(r => setTimeout(r, 500))
  return books.find(book => book.slug === slug)
}