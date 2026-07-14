'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  {
    id: 1,
    label: 'Home',
    href: '/',
  },
  {
    id: 2,
    label: 'Movies',
    href: '/movies',
  },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="hidden md:block">
      <ul className="flex gap-4">
        {navItems.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);

          return (
            <li key={item.id}>
              <Link
                className={`transition ${
                  isActive
                    ? 'text-on-surface font-medium'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
