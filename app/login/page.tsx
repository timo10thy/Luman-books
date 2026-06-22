import { loginAction } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-white rounded-xl border border-ink/8 p-8">
        <h1 className="font-playfair text-2xl font-semibold text-ink mb-1">
          Seller login
        </h1>
        <p className="text-sm text-ink/50 mb-6">
          Sign in to manage your Lumen Books listings.
        </p>

        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            Invalid email or password.
          </p>
        )}

        <form action={loginAction} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-ink/70 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              defaultValue="admin@lumenbooks.com"
              className="w-full px-3 py-2 border border-ink/15 rounded-lg text-sm focus:outline-none focus:border-gold"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-ink/70 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-ink/15 rounded-lg text-sm focus:outline-none focus:border-gold"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-ink text-cream rounded-lg text-sm font-medium hover:bg-ink/80 transition-colors"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  )
}