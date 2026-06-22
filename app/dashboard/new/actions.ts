'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { addBook } from '@/lib/data'

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .split(' ')
    .filter((word) => word.length > 0)
    .join('-')
}

export async function addBookAction(formData: FormData) {
  const title = formData.get('title') as string
  const author = formData.get('author') as string
  const price = Number(formData.get('price'))
  const description = formData.get('description') as string
  const category = formData.get('category') as string
  const coverImageUrl = (formData.get('coverImageUrl') as string) || '/images/midnight.png'

  await addBook({
    slug: slugify(title),
    title,
    author,
    price,
    description,
    category,
    coverImageUrl,
    createdAt: new Date().toISOString(),
    ratingsCount: 0,
  })

  revalidatePath('/books')
  redirect('/dashboard')
}