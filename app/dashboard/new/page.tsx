import { addBookAction } from './actions'

const CATEGORIES = ['Fiction', 'Non-Fiction', 'History', 'Science']

export default function NewBookPage() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-xl mx-auto px-6 py-12">
        <p className="text-sm font-medium uppercase tracking-widest text-gold mb-1">
          Seller dashboard
        </p>
        <h1 className="font-playfair text-3xl font-bold text-ink mb-8">
          Add a new book
        </h1>

        <form action={addBookAction} className="space-y-5 bg-white rounded-xl border border-ink/8 p-6">
          <div>
            <label htmlFor="title" className="block text-sm text-ink/70 mb-1">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              required
              className="w-full px-3 py-2 border border-ink/15 rounded-lg text-sm focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label htmlFor="author" className="block text-sm text-ink/70 mb-1">Author</label>
            <input
              id="author"
              name="author"
              type="text"
              required
              className="w-full px-3 py-2 border border-ink/15 rounded-lg text-sm focus:outline-none focus:border-gold"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm text-ink/70 mb-1">Price (₦)</label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                required
                className="w-full px-3 py-2 border border-ink/15 rounded-lg text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm text-ink/70 mb-1">Category</label>
              <select
                id="category"
                name="category"
                required
                className="w-full px-3 py-2 border border-ink/15 rounded-lg text-sm focus:outline-none focus:border-gold"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm text-ink/70 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              className="w-full px-3 py-2 border border-ink/15 rounded-lg text-sm focus:outline-none focus:border-gold resize-none"
            />
          </div>

          <div>
            <label htmlFor="coverImageUrl" className="block text-sm text-ink/70 mb-1">
              Cover image path <span className="text-ink/40">(optional)</span>
            </label>
            <input
              id="coverImageUrl"
              name="coverImageUrl"
              type="text"
              placeholder="/images/midnight.png"
              className="w-full px-3 py-2 border border-ink/15 rounded-lg text-sm focus:outline-none focus:border-gold"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-gold text-ink rounded-lg text-sm font-medium hover:bg-gold/90 transition-colors"
          >
            Add book
          </button>
        </form>
      </div>
    </main>
  )
}