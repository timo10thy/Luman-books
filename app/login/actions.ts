'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { HARDCODED_EMAIL, HARDCODED_PASSWORD, AUTH_COOKIE_NAME, AUTH_SECRET } from '@/lib/auth'
export async function loginAction(formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')

  if (email !== HARDCODED_EMAIL || password !== HARDCODED_PASSWORD) {
    redirect('/login?error=invalid')
  }

  const cookieStore = await cookies()
  cookieStore.set(AUTH_COOKIE_NAME, AUTH_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  })
  redirect('/dashboard')
}