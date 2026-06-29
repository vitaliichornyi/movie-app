'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItemProps {
  children: React.ReactNode;
  href: string;
}

export default function NavItem({ children, href }: NavItemProps) {
  const pathname = usePathname();
  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <li>
      <Link
        className={`transition ${
          isActive
            ? 'text-on-surface font-medium'
            : 'text-on-surface-variant hover:text-on-surface'
        }`}
        href={href}
      >
        {children}
      </Link>
    </li>
  );
}
