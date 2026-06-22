# Lumen Books

A small online bookstore with a seller dashboard, built to demonstrate every major Next.js rendering and data pattern deliberately and in the right place.

## Tech Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4 (CSS-based config, no `tailwind.config.ts`)
- Local in-memory data module (`lib/data.ts`) with simulated network latency

---

## How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/timo10thy/Luman-books.git
cd Luman-books

# 2. Install dependencies
npm install

# 3. Create environment variables
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SITE_URL=http://localhost:3000

# 4. Start the dev server
npm run dev
```

Visit `http://localhost:3000`

**Seller login credentials (mock auth):**
- Email: `admin@lumenbooks.com`
- Password: `lumen123`

---

## Rendering Strategy Table

| Route | Mode | Why |
|---|---|---|
| `/` | Static + ISR (`revalidate: 3600`) | Featured books don't change per-request. ISR lets them refresh every hour without a full rebuild. |
| `/books` | SSR (Dynamic) | Reads `searchParams` (category filter, sort order) at request time — different query = different HTML. Can't be static. |
| `/books/[slug]` | SSG (`generateStaticParams`) | All 6 known book slugs are pre-rendered at build time. Fast, cacheable, SEO-friendly. ISR fallback handles any new books added at runtime. |
| `/login` | Dynamic | Reads `searchParams` for the `?error=` flag. Server Action handles credential validation and sets the auth cookie. |
| `/dashboard` | SSR (Dynamic) | Reads the `lumen_session` auth cookie at request time to render seller-specific content. Cookie access forces dynamic rendering automatically. |
| `/dashboard/new` | Static (protected by proxy) | The form itself has no request-time data dependencies — it's a static shell. Protection comes from `proxy.ts`, not from the page being dynamic. |
| `/api/books` | Dynamic (Route Handler) | Server-side GET handler returning JSON, consumed client-side by the `LiveSearch` component via `fetch`. |

---

## next build Output

```
Route (app)                      Revalidate  Expire
┌ ○ /                                    1h      1y
├ ○ /_not-found
├ ƒ /books
├ ● /books/[slug]
│ ├ /books/the-midnight-library
│ ├ /books/atomic-habits
│ ├ /books/sapiens
│ └ [+3 more paths]
├ ƒ /dashboard
├ ○ /dashboard/new
└ ƒ  /login
ƒ Proxy (Middleware)
○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

**Justifications:**

- `○ /` — Static with ISR. `export const revalidate = 3600` tells Next.js to regenerate this page at most every hour.
- `ƒ /books` — Dynamic/SSR. Reading `await searchParams` at request time automatically opts this route into dynamic rendering — no `force-dynamic` needed.
- `● /books/[slug]` — SSG. `generateStaticParams()` pre-renders all 6 known book slugs at build time. New slugs added via `/dashboard/new` are handled by ISR fallback.
- `ƒ /dashboard` — Dynamic/SSR. Reading `await cookies()` at request time forces dynamic rendering, serving per-user content on every request.
- `○ /dashboard/new` — Static shell, protected at the edge by `proxy.ts`. The page itself has no request-time dependencies.
- `ƒ /login` — Dynamic. Reads `searchParams` for the error flag, and the Server Action sets an `httpOnly` cookie on submission.

---

## Bonus Items Attempted

None attempted in this submission. Core requirements were the priority.

---

## Trade-off

The biggest deliberate trade-off was using an **in-memory array** in `lib/data.ts` as the data store instead of a real database. This meant that books added via `/dashboard/new` persist only until the server restarts. The benefit was keeping the focus entirely on Next.js rendering patterns — SSR, ISR, SSG, Server Actions, Suspense streaming — without introducing database complexity (connection pooling, schema migrations, ORM setup). `revalidatePath('/books')` is called after each mutation, which correctly demonstrates cache invalidation even with the in-memory store. A real database (PostgreSQL + Prisma) would be a straightforward swap for production use.

---

## Architecture Notes

- **Server Components by default** — only 3 Client Components exist: `Navbar.tsx` (`usePathname` for active link), `error.tsx` (required by Next.js), `LiveSearch.tsx` (`useState`/`useEffect`/`fetch` to `/api/books`)
- **`proxy.ts`** — Next.js 16 renamed `middleware.ts` to `proxy.ts`. Migrated to current convention. Gates all `/dashboard/**` routes at the edge before any page component executes.
- **Fonts** — `Playfair Display` (headings) + `DM Sans` (body) via `next/font/google`, variables applied at root layout level
- **Colors** — custom palette defined in `globals.css` `@theme` block (Tailwind v4 CSS-based config): `ink`, `cream`, `gold`, `sage`