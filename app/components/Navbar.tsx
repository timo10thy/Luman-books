'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/books', label: 'Books' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/login', label: 'Login' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-cream border-b border-ink/10 shadow-sm">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-bold font-playfair text-ink tracking-tight">
            Lumen
          </span>
          <span className="text-2xl font-bold font-playfair text-gold tracking-tight">
            Books
          </span>
        </Link>

        {/* Nav Links */}
        <ul className="flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            const isActive =
              href === '/' ? pathname === '/' : pathname.startsWith(href);

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? 'bg-gold/15 text-gold font-semibold'
                      : 'text-ink/70 hover:text-ink hover:bg-ink/5'
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}